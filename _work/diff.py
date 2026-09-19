import difflib, io, sys

base = r"D:\29876\Documents\wuddy\比赛\_work"
a = open(base + r"\guide_full.txt", encoding="utf-8").read().splitlines()
b = open(base + r"\guide_910.txt", encoding="utf-8").read().splitlines()

print("old lines", len(a), "new lines", len(b))
sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
ops = [o for o in sm.get_opcodes() if o[0] != "equal"]
print("diff blocks", len(ops))

out = []
for tag, i1, i2, j1, j2 in ops:
    out.append("===== " + tag + " old[%d:%d] new[%d:%d]" % (i1, i2, j1, j2))
    if tag in ("replace", "delete"):
        for x in a[i1:i2]:
            out.append("  OLD | " + x)
    if tag in ("replace", "insert"):
        for x in b[j1:j2]:
            out.append("  NEW | " + x)

open(base + r"\diff_out.txt", "w", encoding="utf-8").write("\n".join(out))
print("diff written, lines:", len(out))
