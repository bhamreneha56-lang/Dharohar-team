import os, re
directory = 'src/pages'
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                content = f.read()
                bgs = re.findall(r'bg-(?:\[#[a-fA-F0-9]+\]|white|slate-\d+|gray-\d+|transparent|black|indian-flag)', content)
                if bgs: print(f'{file}: {set(bgs)}')

