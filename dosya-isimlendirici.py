import os


os.system('cls' if os.name == 'nt' else 'clear')

# Klasör yolu
folder_path = r'C:\Users\abdulhalim.yildiz\Documents\Web Site\HST-WebSite-CG\images\products\demiryolu\urunler'

resimler = []
if os.path.isdir(folder_path):
    for dosya in os.listdir(folder_path):
        if dosya.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            name, _ = os.path.splitext(dosya)
            yeni_ad = f"'{name}.webp'"
            resimler.append(yeni_ad)

    # Listeyi yazdır
    print("[")
    print(",\n".join(resimler))
    print("]")
else:
    print("Klasör yolu bulunamadı!")