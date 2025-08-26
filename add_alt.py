import glob
import re

# Klasördeki tüm html dosyalarını bul
for file in glob.glob("*.html"):
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    # img etiketlerini kontrol et ve alt yoksa ekle
    def add_alt(match):
        tag = match.group(0)
        if 'alt=' not in tag:
            # kapanış > karakterinden önce alt="img" ekle
            return tag[:-1] + ' alt="img">'
        return tag

    new_content = re.sub(r'<img[^>]*>', add_alt, content)

    # Dosyayı güncelle
    with open(file, "w", encoding="utf-8") as f:
        f.write(new_content)

print("✅ Tüm HTML dosyalarında eksik alt eklendi.")