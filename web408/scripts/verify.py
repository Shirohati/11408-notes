import json

with open(r'E:\agents\notes\web408\scripts\tmp-ds.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f'Total questions: {len(data)}')

empty = [q['id'] for q in data if not q.get('knowledgePoints')]
print(f'Questions with empty knowledgePoints: {empty}')

# Verify all have exactly one knowledge point
for q in data:
    if len(q.get('knowledgePoints', [])) != 1:
        print(f'  WARNING: {q["id"]} has {len(q.get("knowledgePoints", []))} knowledge points')

print('Sample checks:')
for q in data[:5]:
    print(f'  {q["id"]}: {q["knowledgePoints"]}')

for q in data[-5:]:
    print(f'  {q["id"]}: {q["knowledgePoints"]}')
