import os

OUTPUT_DIR = "output_structure_chunks"
LINES_PER_FILE = 5000
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def walk_directory(root_dir):
    file_tree = []
    for root, dirs, files in os.walk(root_dir):
        level = root.replace(root_dir, '').count(os.sep)
        indent = '  ' * level
        file_tree.append(f"{indent}{os.path.basename(root)}/")
        for f in files:
            file_tree.append(f"{indent}  {f}")
    return file_tree

def save_chunks(lines, base_filename):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for i in range(0, len(lines), LINES_PER_FILE):
        chunk = lines[i:i + LINES_PER_FILE]
        part_num = i // LINES_PER_FILE + 1
        with open(os.path.join(OUTPUT_DIR, f"{base_filename}_part{part_num}.txt"), "w", encoding="utf-8") as f:
            f.write("\n".join(chunk))

if __name__ == "__main__":
    print(f"Exporting project folder structure from: {PROJECT_ROOT}")
    lines = walk_directory(PROJECT_ROOT)
    save_chunks(lines, "project_structure")
    print(f"✅ Done! Output saved in ./{OUTPUT_DIR}/")
