import concurrent.futures
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# 设置请求头
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Cookie': 'abRequestId=e0990761-cb4d-53ad-a338-dc2befa6cb71; webBuild=3.19.4; xsecappid=xhs-pc-web; a1=18c5ce29ddaoo5za1eb6nujner9oj53zgj1kpnafm50000379015; webId=194b8b1b58d1ab1a921bd7e8b49b16aa; websectiga=984412fef754c018e472127b8effd174be8a5d51061c991aadd200c69a2801d6; sec_poison_id=8df67807-5538-492b-bc30-900b70700586; web_session=030037a24b5cab02b6f0934e00224a87b862c5; gid=yYS2SdJ0fqkqyYS2SdJjfVI0f0ll2u0ydDKIyi67VIdFjT28lV2quU888qWj8y28K8Y2dWdJ; unread={%22ub%22:%22656bbed10000000038032e19%22%2C%22ue%22:%2265611e5b000000001100c0d6%22%2C%22uc%22:32}'    
}

# 目标小红书笔记的url
url = 'https://www.xiaohongshu.com/explore?channel_id=homefeed_recommend'

# 特征列表
text_features = []
position_list = []
date_list = []
url_list = []

# 定义一个函数来处理单个链接
def process_link(link):
    
    global count

    text_feature = ''
    note_url = 'https://www.xiaohongshu.com' + link.get('href')

    # 发送请求
    response = requests.get(note_url, headers=headers)

    # 解析笔记内容
    soup = BeautifulSoup(response.text, 'html.parser')

    # 获取笔记标题
    title = soup.find('div', attrs={'class': 'title', 'id': 'detail-title'})
    if title:
        text_feature += title.text

    # 获取笔记正文
    content = soup.findAll('div', attrs={'class': 'desc', 'id': 'detail-desc'})
    if content:
        text = content[0].findAll('span')
        if len(text) > 0:
            text_feature += text[0].text

    tag = content[0].findAll('a')
    if tag:
        for t in tag:
            text_feature += t.text[1:]

    # 清除空格
    text_feature = text_feature.strip()

    # 如果笔记长度小于阈值就跳过
    if len(text_feature) < threshold:
        print('too short')
        return None

    # 获取笔记日期和位置
    date_and_position = soup.find('div', attrs={'class': 'bottom-container'})
    date = date_and_position.text[:10]
    position = date_and_position.text[-2:]

    date_list.append(date)
    position_list.append(position)
    text_features.append(text_feature)
    url_list.append(note_url)

    count += 1
    print(count)
    
max_workers = 16
target = 10000
count = 0
threshold = 30

error02_count = 0
   
if __name__ == '__main__':
 
    while count < target:

        # 发送请求
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            print('Error01')
            break

        # 解析数据
        soup = BeautifulSoup(response.text, 'html.parser')

        # 查找所有笔记链接
        all_links = soup.find_all('a', attrs={'class': 'title'})
        
        if len(all_links) == 0:
            print('Error02')
            error02_count += 1
            if error02_count > 10:
                break
        else:
            error02_count = 0

        # 使用多线程处理链接
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            # 使用executor.map并发地处理所有链接
            executor.map(process_link, all_links)

    if count == 0:
        print('No data')
        exit(1)
        
    # 保存为csv文件
    df = pd.DataFrame({'date': date_list, 'position': position_list, 'text': text_features, 'url': url_list})
    # 保存结果，用当前时间命名
    df.to_csv('C:/Users/11622/Desktop/学习/大三上/软件项目管理/SNWDataAnalysis/DataProcessing/data/source_data/xiaohongshu' + time.strftime("%Y%m%d%H%M%S", time.localtime()) + '.csv', encoding='utf-8', index=False, header=False, escapechar='\\')