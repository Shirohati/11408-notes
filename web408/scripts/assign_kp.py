import json
from collections import Counter

with open(r'E:\agents\notes\web408\scripts\tmp-ds.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

kp_map = {
    "EX_2009_01": "ds_sq_queue",
    "EX_2009_02": "ds_sq_stack",
    "EX_2009_03": "ds_tree_traversal",
    "EX_2009_04": "ds_tree_basic",
    "EX_2009_05": "ds_tree_basic",
    "EX_2009_06": "ds_tree_forest",
    "EX_2009_07": "ds_graph_basic",
    "EX_2009_08": "ds_search_btree",
    "EX_2009_09": "ds_sort_select",
    "EX_2009_10": "ds_sort_insert",

    "EX_2010_01": "ds_sq_stack",
    "EX_2010_02": "ds_sq_queue",
    "EX_2010_03": "ds_tree_threaded",
    "EX_2010_04": "ds_tree_basic",
    "EX_2010_05": "ds_tree_basic",
    "EX_2010_06": "ds_tree_huffman",
    "EX_2010_07": "ds_graph_basic",
    "EX_2010_08": "ds_graph_topological",
    "EX_2010_09": "ds_search_seq_bin",
    "EX_2010_10": "ds_sort_swap",

    "EX_2011_01": "ds_ll_definition",
    "EX_2011_02": "ds_sq_stack",
    "EX_2011_03": "ds_sq_circular",
    "EX_2011_04": "ds_tree_basic",
    "EX_2011_05": "ds_tree_traversal",
    "EX_2011_06": "ds_tree_forest",
    "EX_2011_07": "ds_tree_basic",
    "EX_2011_08": "ds_graph_basic",
    "EX_2011_09": "ds_search_hash",
    "EX_2011_10": "ds_sort_swap",

    "EX_2012_01": "ds_ll_definition",
    "EX_2012_02": "ds_sq_stack_app",
    "EX_2012_03": "ds_tree_traversal",
    "EX_2012_04": "ds_tree_basic",
    "EX_2012_05": "ds_graph_bfs",
    "EX_2012_06": "ds_graph_topological",
    "EX_2012_07": "ds_graph_shortest",
    "EX_2012_08": "ds_graph_mst",
    "EX_2012_09": "ds_search_btree",
    "EX_2012_10": "ds_sort_select",

    "EX_2013_01": "ds_ll_linked",
    "EX_2013_02": "ds_sq_stack",
    "EX_2013_03": "ds_tree_basic",
    "EX_2013_04": "ds_tree_huffman",
    "EX_2013_05": "ds_tree_threaded",
    "EX_2013_06": "ds_tree_basic",
    "EX_2013_07": "ds_graph_storage",
    "EX_2013_08": "ds_graph_bfs",
    "EX_2013_09": "ds_graph_critical",
    "EX_2013_10": "ds_search_btree",

    "EX_2014_01": "ds_ll_definition",
    "EX_2014_02": "ds_sq_stack_app",
    "EX_2014_03": "ds_sq_circular",
    "EX_2014_04": "ds_tree_threaded",
    "EX_2014_05": "ds_tree_forest",
    "EX_2014_06": "ds_tree_huffman",
    "EX_2014_07": "ds_graph_topological",
    "EX_2014_08": "ds_search_hash",
    "EX_2014_09": "ds_search_btree",
    "EX_2014_10": "ds_sort_insert",

    "EX_2015_01": "ds_sq_stack_app",
    "EX_2015_02": "ds_tree_basic",
    "EX_2015_03": "ds_tree_huffman",
    "EX_2015_04": "ds_tree_basic",
    "EX_2015_05": "ds_graph_dfs",
    "EX_2015_06": "ds_graph_mst",
    "EX_2015_07": "ds_search_seq_bin",
    "EX_2015_08": "ds_search_seq_bin",
    "EX_2015_09": "ds_sort_merge",
    "EX_2015_10": "ds_sort_select",

    "EX_2016_01": "ds_ll_linked",
    "EX_2016_02": "ds_ll_double_circular",
    "EX_2016_03": "ds_sq_queue",
    "EX_2016_04": "ds_sq_matrix",
    "EX_2016_05": "ds_tree_forest",
    "EX_2016_06": "ds_graph_dfs",
    "EX_2016_07": "ds_graph_topological",
    "EX_2016_08": "ds_graph_shortest",
    "EX_2016_09": "ds_search_seq_bin",
    "EX_2016_10": "ds_search_btree",

    "EX_2017_01": "ds_ll_definition",
    "EX_2017_02": "ds_sq_stack",
    "EX_2017_03": "ds_sq_matrix",
    "EX_2017_04": "ds_tree_traversal",
    "EX_2017_05": "ds_tree_traversal",
    "EX_2017_06": "ds_tree_huffman",
    "EX_2017_07": "ds_graph_basic",
    "EX_2017_08": "ds_search_seq_bin",
    "EX_2017_09": "ds_search_btree",
    "EX_2017_10": "ds_sort_merge",

    "EX_2018_01": "ds_sq_stack_app",
    "EX_2018_02": "ds_sq_queue",
    "EX_2018_03": "ds_sq_matrix",
    "EX_2018_04": "ds_tree_basic",
    "EX_2018_05": "ds_tree_huffman",
    "EX_2018_06": "ds_tree_basic",
    "EX_2018_07": "ds_graph_topological",
    "EX_2018_08": "ds_search_btree",
    "EX_2018_09": "ds_search_hash",
    "EX_2018_10": "ds_sort_insert",

    "EX_2019_01": "ds_ll_definition",
    "EX_2019_02": "ds_tree_forest",
    "EX_2019_03": "ds_tree_huffman",
    "EX_2019_04": "ds_tree_basic",
    "EX_2019_05": "ds_graph_critical",
    "EX_2019_06": "ds_graph_basic",
    "EX_2019_07": "ds_sort_insert",
    "EX_2019_08": "ds_search_hash",
    "EX_2019_09": "ds_search_seq_bin",
    "EX_2019_10": "ds_sort_swap",

    "EX_2020_01": "ds_sq_matrix",
    "EX_2020_02": "ds_sq_stack",
    "EX_2020_03": "ds_tree_basic",
    "EX_2020_04": "ds_tree_forest",
    "EX_2020_05": "ds_tree_basic",
    "EX_2020_06": "ds_graph_dfs",
    "EX_2020_07": "ds_graph_mst",
    "EX_2020_08": "ds_graph_critical",
    "EX_2020_09": "ds_sort_select",
    "EX_2020_10": "ds_search_btree",
}

for q in data:
    qid = q["id"]
    q["knowledgePoints"] = [kp_map[qid]]

unassigned = [q["id"] for q in data if not q.get("knowledgePoints")]
if unassigned:
    print(f"UNASSIGNED: {unassigned}")
else:
    print("All 120 questions assigned successfully.")

counter = Counter()
for q in data:
    for kp in q["knowledgePoints"]:
        counter[kp] += 1

print("\nDistribution:")
for kp, count in sorted(counter.items()):
    print(f"  {kp}: {count}")

with open(r'E:\agents\notes\web408\scripts\tmp-ds.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\nFile written successfully.")
