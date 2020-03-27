from os import listdir
from os.path import isfile, join
import json

onlyfiles = [f for f in listdir('../img/2017') if isfile(join('../img/2017', f))]
img_list = []

for file in onlyfiles:
  temp = dict([('src', './img/2017/' + file), ('w', 1382), ('h', 1036)])
  img_list.append(temp)


# print(json.dumps(img_list))
#
# print()

onlyfiles = [f for f in listdir('../img/2018') if isfile(join('../img/2018', f))]
img_list = []

for file in onlyfiles:
  img_info = file.split('-')
  temp = dict([('src', './img/2018/' + file), ('w', 1382), ('h', 1036)])
  img_list.append(temp)


print(json.dumps(img_list))
