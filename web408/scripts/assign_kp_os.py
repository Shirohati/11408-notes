import json

with open(r"E:\agents\notes\web408\scripts\tmp-os.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

mapping = {
    "EX_2009_23": "os_intro_concept",
    "EX_2009_24": "os_process_algorithm",
    "EX_2009_25": "os_process_deadlock",
    "EX_2009_26": "os_mem_contiguous",
    "EX_2009_27": "os_mem_segmentation",
    "EX_2009_28": "os_file_impl",
    "EX_2009_29": "os_io_disk",
    "EX_2009_30": "os_file_basic",
    "EX_2009_31": "os_file_basic",
    "EX_2009_32": "os_io_control",

    "EX_2010_23": "os_intro_status",
    "EX_2010_24": "os_process_state",
    "EX_2010_25": "os_process_sync",
    "EX_2010_26": "os_process_schedule",
    "EX_2010_27": "os_process_sync",
    "EX_2010_28": "os_mem_contiguous",
    "EX_2010_29": "os_mem_paging",
    "EX_2010_30": "os_file_impl",
    "EX_2010_31": "os_file_directory",
    "EX_2010_32": "os_intro_status",

    "EX_2011_23": "os_process_algorithm",
    "EX_2011_24": "os_intro_status",
    "EX_2011_25": "os_process_state",
    "EX_2011_26": "os_io_control",
    "EX_2011_27": "os_process_deadlock",
    "EX_2011_28": "os_mem_virtual",
    "EX_2011_29": "os_mem_thrashing",
    "EX_2011_30": "os_mem_virtual",
    "EX_2011_31": "os_io_buffer",
    "EX_2011_32": "os_process_sync",

    "EX_2012_23": "os_intro_status",
    "EX_2012_24": "os_intro_status",
    "EX_2012_25": "os_mem_virtual",
    "EX_2012_26": "os_io_control",
    "EX_2012_27": "os_process_deadlock",
    "EX_2012_28": "os_io_control",
    "EX_2012_29": "os_process_schedule",
    "EX_2012_30": "os_process_schedule",
    "EX_2012_31": "os_process_state",
    "EX_2012_32": "os_io_disk",

    "EX_2013_23": "os_file_basic",
    "EX_2013_24": "os_file_impl",
    "EX_2013_25": "os_io_control",
    "EX_2013_26": "os_file_impl",
    "EX_2013_27": "os_io_buffer",
    "EX_2013_28": "os_intro_status",
    "EX_2013_29": "os_intro_status",
    "EX_2013_30": "os_mem_virtual",
    "EX_2013_31": "os_process_schedule",
    "EX_2013_32": "os_process_deadlock",

    "EX_2014_23": "os_process_algorithm",
    "EX_2014_24": "os_process_deadlock",
    "EX_2014_25": "os_intro_status",
    "EX_2014_26": "os_process_state",
    "EX_2014_27": "os_file_impl",
    "EX_2014_28": "os_mem_paging",
    "EX_2014_29": "os_file_basic",
    "EX_2014_30": "os_mem_virtual",
    "EX_2014_31": "os_process_sync",
    "EX_2014_32": "os_mem_paging",

    "EX_2015_23": "os_intro_status",
    "EX_2015_24": "os_intro_status",
    "EX_2015_25": "os_process_state",
    "EX_2015_26": "os_process_deadlock",
    "EX_2015_27": "os_mem_virtual",
    "EX_2015_28": "os_io_buffer",
    "EX_2015_29": "os_file_impl",
    "EX_2015_30": "os_mem_thrashing",
    "EX_2015_31": "os_file_impl",
    "EX_2015_32": "os_io_disk",

    "EX_2016_23": "os_intro_concept",
    "EX_2016_24": "os_process_schedule",
    "EX_2016_25": "os_process_deadlock",
    "EX_2016_26": "os_mem_virtual",
    "EX_2016_27": "os_process_sync",
    "EX_2016_28": "os_mem_segmentation",
    "EX_2016_29": "os_mem_thrashing",
    "EX_2016_30": "os_process_sync",
    "EX_2016_31": "os_io_buffer",
    "EX_2016_32": "os_process_sync",

    "EX_2017_23": "os_process_algorithm",
    "EX_2017_24": "os_intro_status",
    "EX_2017_25": "os_mem_contiguous",
    "EX_2017_26": "os_file_impl",
    "EX_2017_27": "os_process_schedule",
    "EX_2017_28": "os_intro_concept",
    "EX_2017_29": "os_file_basic",
    "EX_2017_30": "os_file_basic",
    "EX_2017_31": "os_file_basic",
    "EX_2017_32": "os_io_control",

    "EX_2018_23": "os_intro_concept",
    "EX_2018_24": "os_process_algorithm",
    "EX_2018_25": "os_process_sync",
    "EX_2018_26": "os_process_deadlock",
    "EX_2018_27": "os_process_state",
    "EX_2018_28": "os_process_sync",
    "EX_2018_29": "os_intro_status",
    "EX_2018_30": "os_io_disk",
    "EX_2018_31": "os_file_impl",
    "EX_2018_32": "os_process_sync",

    "EX_2019_23": "os_process_state",
    "EX_2019_24": "os_process_state",
    "EX_2019_25": "os_intro_status",
    "EX_2019_26": "os_file_impl",
    "EX_2019_27": "os_process_algorithm",
    "EX_2019_28": "os_mem_segmentation",
    "EX_2019_29": "os_mem_virtual",
    "EX_2019_30": "os_process_deadlock",
    "EX_2019_31": "os_mem_paging",
    "EX_2019_32": "os_mem_contiguous",

    "EX_2020_23": "os_file_basic",
    "EX_2020_24": "os_file_impl",
    "EX_2020_25": "os_intro_status",
    "EX_2020_26": "os_process_algorithm",
    "EX_2020_27": "os_process_deadlock",
    "EX_2020_28": "os_mem_virtual",
    "EX_2020_29": "os_process_state",
    "EX_2020_30": "os_io_control",
    "EX_2020_31": "os_file_basic",
    "EX_2020_32": "os_process_sync",
}

for q in questions:
    qid = q["id"]
    if qid in mapping:
        q["knowledgePoints"] = [mapping[qid]]
    else:
        print(f"WARNING: No mapping for {qid}")

with open(r"E:\agents\notes\web408\scripts\tmp-os.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

# Summary
from collections import Counter
counts = Counter(mapping.values())
print("=== Summary ===")
for kp, cnt in sorted(counts.items()):
    print(f"{kp}: {cnt}")
print(f"Total: {sum(counts.values())}")
