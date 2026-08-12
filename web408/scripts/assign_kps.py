import json

json_path = r"E:\agents\notes\web408\scripts\tmp-cn.json"

with open(json_path, 'r', encoding='utf-8') as f:
    questions = json.load(f)

kp_map = {
    "EX_2009_33": ["cn_arch_model"],
    "EX_2009_34": ["cn_physical_comm"],
    "EX_2009_35": ["cn_dl_flow"],
    "EX_2009_36": ["cn_dl_lan"],
    "EX_2009_37": ["cn_dl_mac"],
    "EX_2009_38": ["cn_tp_tcp"],
    "EX_2009_39": ["cn_tp_tcp"],
    "EX_2009_40": ["cn_tp_tcp"],
    "EX_2010_33": ["cn_arch_basic"],
    "EX_2010_34": ["cn_arch_basic"],
    "EX_2010_35": ["cn_net_route"],
    "EX_2010_36": ["cn_net_protocols"],
    "EX_2010_37": ["cn_net_ipv4"],
    "EX_2010_38": ["cn_net_ipv4"],
    "EX_2010_39": ["cn_tp_tcp"],
    "EX_2010_40": ["cn_app_dns"],
    "EX_2011_33": ["cn_arch_model"],
    "EX_2011_34": ["cn_physical_comm"],
    "EX_2011_35": ["cn_dl_flow"],
    "EX_2011_36": ["cn_dl_mac"],
    "EX_2011_37": ["cn_net_route"],
    "EX_2011_38": ["cn_net_ipv4"],
    "EX_2011_39": ["cn_tp_handshake"],
    "EX_2011_40": ["cn_tp_tcp"],
    "EX_2012_33": ["cn_net_protocols"],
    "EX_2012_34": ["cn_physical_media"],
    "EX_2012_35": ["cn_dl_lan"],
    "EX_2012_36": ["cn_dl_flow"],
    "EX_2012_37": ["cn_net_ipv4"],
    "EX_2012_38": ["cn_net_protocols"],
    "EX_2012_39": ["cn_net_ipv4"],
    "EX_2012_40": ["cn_app_email"],
    "EX_2013_33": ["cn_arch_model"],
    "EX_2013_34": ["cn_physical_comm"],
    "EX_2013_35": ["cn_arch_basic"],
    "EX_2013_36": ["cn_dl_mac"],
    "EX_2013_37": ["cn_dl_lan"],
    "EX_2013_38": ["cn_dl_lan"],
    "EX_2013_39": ["cn_tp_tcp"],
    "EX_2013_40": ["cn_app_email"],
    "EX_2014_33": ["cn_arch_model"],
    "EX_2014_34": ["cn_dl_lan"],
    "EX_2014_35": ["cn_physical_comm"],
    "EX_2014_36": ["cn_dl_flow"],
    "EX_2014_37": ["cn_dl_mac"],
    "EX_2014_38": ["cn_tp_tcp"],
    "EX_2014_39": ["cn_tp_udp"],
    "EX_2014_40": ["cn_app_http"],
    "EX_2015_33": ["cn_app_email"],
    "EX_2015_34": ["cn_physical_comm"],
    "EX_2015_35": ["cn_dl_flow"],
    "EX_2015_36": ["cn_dl_mac"],
    "EX_2015_37": ["cn_dl_lan"],
    "EX_2015_38": ["cn_net_ipv4"],
    "EX_2015_39": ["cn_tp_tcp"],
    "EX_2015_40": ["cn_app_http"],
    "EX_2016_33": ["cn_arch_model"],
    "EX_2016_34": ["cn_physical_comm"],
    "EX_2016_35": ["cn_dl_lan"],
    "EX_2016_36": ["cn_dl_mac"],
    "EX_2016_37": ["cn_net_route"],
    "EX_2016_38": ["cn_net_ipv4"],
    "EX_2016_39": ["cn_net_ipv4"],
    "EX_2016_40": ["cn_app_dns"],
    "EX_2017_33": ["cn_arch_model"],
    "EX_2017_34": ["cn_physical_comm"],
    "EX_2017_35": ["cn_dl_mac"],
    "EX_2017_36": ["cn_net_ipv4"],
    "EX_2017_37": ["cn_net_route"],
    "EX_2017_38": ["cn_net_ipv4"],
    "EX_2017_39": ["cn_tp_tcp"],
    "EX_2017_40": ["cn_tp_tcp"],
    "EX_2018_33": ["cn_app_dns"],
    "EX_2018_34": ["cn_physical_media"],
    "EX_2018_35": ["cn_dl_mac"],
    "EX_2018_36": ["cn_dl_flow"],
    "EX_2018_37": ["cn_net_ipv4"],
    "EX_2018_38": ["cn_net_ipv4"],
    "EX_2018_39": ["cn_tp_udp"],
    "EX_2018_40": ["cn_app_email"],
    "EX_2019_33": ["cn_arch_model"],
    "EX_2019_34": ["cn_physical_media"],
    "EX_2019_35": ["cn_dl_flow"],
    "EX_2019_36": ["cn_dl_mac"],
    "EX_2019_37": ["cn_net_ipv4"],
    "EX_2019_38": ["cn_tp_tcp"],
    "EX_2019_39": ["cn_tp_handshake"],
    "EX_2019_40": ["cn_arch_basic"],
    "EX_2020_33": ["cn_arch_basic"],
    "EX_2020_34": ["cn_arch_basic"],
    "EX_2020_35": ["cn_dl_lan"],
    "EX_2020_36": ["cn_dl_flow"],
    "EX_2020_37": ["cn_dl_mac"],
    "EX_2020_38": ["cn_tp_tcp"],
    "EX_2020_39": ["cn_tp_tcp"],
    "EX_2020_40": ["cn_app_dns"],
}

for q in questions:
    qid = q["id"]
    if qid in kp_map:
        q["knowledgePoints"] = kp_map[qid]
    else:
        print(f"WARNING: No mapping for {qid}")

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

# Summary
from collections import Counter
counter = Counter()
for q in questions:
    kp = q["knowledgePoints"]
    if kp:
        counter[kp[0]] += 1

print("\n=== Knowledge Point Distribution ===")
total = 0
for kp in sorted(counter.keys()):
    cnt = counter[kp]
    total += cnt
    print(f"  {kp}: {cnt}")
print(f"  TOTAL: {total}")
