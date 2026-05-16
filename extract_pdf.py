import os
import PyPDF2

pdf_dir = r"C:\PROMOCION REDES\MATERIAL PROMOCION\DOCUMENTOS"
pdf_files = [
    "The_Connected_Future (1).pdf",
    "analisis-funcional-y-perfil-profesional-rt.pdf",
    "caracterizacion-de-la-familia-rt (1).pdf",
    "curriculo-FIP-rt.pdf"
]

output_file = r"C:\PROMOCION REDES\extracted_texts.txt"

with open(output_file, "w", encoding="utf-8") as out_f:
    for filename in pdf_files:
        filepath = os.path.join(pdf_dir, filename)
        out_f.write(f"\n\n{'='*40}\nFILE: {filename}\n{'='*40}\n")
        try:
            with open(filepath, "rb") as pdf_file:
                reader = PyPDF2.PdfReader(pdf_file)
                for page_num in range(len(reader.pages)):
                    page = reader.pages[page_num]
                    text = page.extract_text()
                    if text:
                        out_f.write(text + "\n")
        except Exception as e:
            out_f.write(f"Error reading file: {e}\n")

print(f"Extracted text saved to {output_file}")
