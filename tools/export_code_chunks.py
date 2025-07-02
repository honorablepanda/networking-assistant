import os

OUTPUT_DIR = "output_code_chunks"
LINES_PER_FILE = 5000
TEXT_FILE_EXTENSIONS = [".js", ".jsx", ".json", ".md", ".html", ".css", ".py"]
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def collect_project_files(base_dir):
    collected = []
    for root, _, files in os.walk(base_dir):
        for file in files:
            if any(file.endswith(ext) for ext in TEXT_FILE_EXTENSIONS):
                full_path = os.path.join(root, file)
                collected.append(full_path)
    return collected

def save_chunks(all_file_contents):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    chunk = []
    chunk_num = 1
    line_count = 0

    for file_path, content in all_file_contents:
        entry = f"file name: {file_path}\n\ncode:\n{content}\n\n---\n\n"
        lines = entry.splitlines()
        if line_count + len(lines) > LINES_PER_FILE:
            output_path = os.path.join(OUTPUT_DIR, f"code_chunk_{chunk_num}.txt")
            with open(output_path, "w", encoding="utf-8") as f:
                f.write("\n".join(chunk))
            chunk = []
            line_count = 0
            chunk_num += 1
        chunk.extend(lines)
        line_count += len(lines)

    if chunk:
        output_path = os.path.join(OUTPUT_DIR, f"code_chunk_{chunk_num}.txt")
        with open(output_path, "w", encoding="utf-8") as f:
            f.write("\n".join(chunk))

if __name__ == "__main__":
    print(f"Exporting project code from: {PROJECT_ROOT}")
    files = collect_project_files(PROJECT_ROOT)
    all_contents = []
    for path in files:
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                all_contents.append((path, content))
        except Exception as e:
            print(f"⚠️ Skipping {path}: {e}")
    save_chunks(all_contents)
    print(f"✅ Done! Output saved in ./{OUTPUT_DIR}/")
