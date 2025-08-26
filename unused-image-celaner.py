import os
import re
import ast

# ------------------------
# 1️⃣ Ana klasör
# ------------------------
root_folder = "./"  # scriptin çalıştığı klasör
skip_folder = os.path.abspath(os.path.join(root_folder, "images/products"))

# Hariç tutulacak dosya isimleri (uzantısız yaz, içinde geçen adı arayacak)
skip_files = ["bg-pattern_blue", "bg-pattern", "ajax-loader"]

# ------------------------
# 2️⃣ HTML, CSS, JS dosyalarını bul
# ------------------------
html_files, css_files, js_files = [], [], []

for subdir, dirs, files in os.walk(root_folder):
    for file in files:
        path = os.path.join(subdir, file)
        if file.lower().endswith(".html"):
            html_files.append(path)
        elif file.lower().endswith(".css"):
            css_files.append(path)
        elif file.lower().endswith(".js"):
            js_files.append(path)

# ------------------------
# 3️⃣ Kullanılan resimler
# ------------------------
used_images = set()

pattern_html_css = re.compile(
    r'src=["\']([^"\']+)["\']|'
    r'data-src=["\']([^"\']+)["\']|'
    r'data-lazy=["\']([^"\']+)["\']|'
    r'url\(["\']?([^"\')]+)["\']?\)|'
    r'\.src\s*=\s*["\']([^"\']+)["\']|'
    r'\.backgroundImage\s*=\s*["\']url\(([^"\')]+)\)["\']'
)

def add_used_path(img_src):
    if img_src:
        path = os.path.normpath(os.path.join(root_folder, img_src))
        path = os.path.abspath(path)
        used_images.add(path)

# HTML + CSS tarama
for file in html_files + css_files:
    with open(file, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
        for match in pattern_html_css.findall(content):
            for img_src in match:
                add_used_path(img_src)

# ------------------------
# 4️⃣ JS array + basePath
# ------------------------
basepath_pattern = re.compile(r'const\s+(\w*Path)\s*=\s*[\'"]([^\'"]+)[\'"]')
array_pattern = re.compile(r'const\s+(\w+)\s*=\s*(\[[^\]]+\])', re.DOTALL)

for file in js_files:
    with open(file, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

        basepaths = {bp[0]: bp[1] for bp in basepath_pattern.findall(content)}

        for arr_name, arr_content in array_pattern.findall(content):
            try:
                py_list = ast.literal_eval(arr_content.replace("'", '"'))
                for item in py_list:
                    if isinstance(item, str):
                        bp_guess = None
                        if "Images" in arr_name:
                            for k, v in basepaths.items():
                                if arr_name.lower().startswith(k.lower().replace("path", "").lower()):
                                    bp_guess = v
                                    break
                        full_path = os.path.abspath(os.path.normpath(os.path.join(root_folder, (bp_guess if bp_guess else "") + item)))
                        used_images.add(full_path)
            except:
                pass

# ------------------------
# 5️⃣ Klasördeki tüm resimler (products hariç)
# ------------------------
all_images = []
for subdir, dirs, files in os.walk(root_folder):
    # "images/products" klasörünü atla
    if os.path.abspath(subdir).startswith(skip_folder):
        continue
    for file in files:
        if file.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif")):
            # hariç tutulacak dosya isimleri kontrolü
            if any(skip in file for skip in skip_files):
                continue
            all_images.append(os.path.abspath(os.path.join(subdir, file)))

# ------------------------
# 6️⃣ Kullanılmayan resimler listesi
# ------------------------
print("💡 Kullanılmayan resimler (products klasörü ve özel dosyalar hariç):")
for image in all_images:
    if image not in used_images:
        print(image)
        # os.remove(image)  # Silmek için yorum satırını kaldır

print("✅ İşlem tamamlandı.")
