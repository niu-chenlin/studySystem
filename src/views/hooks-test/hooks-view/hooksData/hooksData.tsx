import React from 'react';
import { Tag, Space } from 'antd';
import { GlobalTool } from "../../../../tools/global-tool";

enum DIFFICULTY {
    HELL = "地狱",
    WORD = "人间",
    PARADISE = "天堂"
}
enum TYPE {
    TIME = "计时赛",
    HEAT = "热量赛",
}
export const hooksTableColumns  = [
    {
        title: '详情',
        dataIndex: 'index',
        key: 'index',
        render: text => <a>{text}</a>
    },
    {
        title: '赛事',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '难度',
        dataIndex: 'difficulty',
        key: 'difficulty',
    },
    {
        title: '赛事标签',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 3 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        title: '队伍数量',
        dataIndex: 'teamNum',
        key: 'teamNum',
    },
    {
        title: '总人数',
        dataIndex: 'countNum',
        key: 'countNum',
    },
    {
        title: '完赛队伍数',
        dataIndex: 'finishNum',
        key: 'finishNum',
    },
    {
        title: '完赛奖励',
        dataIndex: 'award',
        key: 'award',
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
    },
];
export const hooksTableData = [
    {
        name: "奔跑吧，斯巴达！",
        type: TYPE.TIME,
        difficulty: DIFFICULTY.HELL,
        tags: ['纯跑', '波音747'],
        teamNum: GlobalTool.getRandomNum(1, 5),
        countNum: GlobalTool.getRandomNum(10, 50),
        finishNum: GlobalTool.getRandomNum(0, 2),
        award: "每人一台波音747",
        desc: "环赤道跑步赛"
    },
    {
        name: "奔跑吧，勇士！",
        type: TYPE.TIME,
        difficulty: DIFFICULTY.WORD,
        tags: ['断腿机制', '刘能', '特斯拉'],
        teamNum: GlobalTool.getRandomNum(1, 5),
        countNum: GlobalTool.getRandomNum(10, 50),
        finishNum: GlobalTool.getRandomNum(0, 2),
        award: "每人一台没刹车的特斯拉",
        desc: "环中国跑步赛"
    },
    {
        name: "奔跑吧，凤姐！",
        type: TYPE.TIME,
        difficulty: DIFFICULTY.PARADISE,
        tags: ['啊~七环', '凤姐'],
        teamNum: GlobalTool.getRandomNum(1, 5),
        countNum: GlobalTool.getRandomNum(10, 50),
        finishNum: GlobalTool.getRandomNum(0, 2),
        award: "奖励凤姐给你",
        desc: "环北京跑步赛"
    },

    {
        name: "肥胖终结者",
        type: TYPE.HEAT,
        difficulty: DIFFICULTY.HELL,
        tags: ['脂肪', '爱咋咋', '健康'],
        teamNum: GlobalTool.getRandomNum(1, 5),
        countNum: GlobalTool.getRandomNum(10, 50),
        finishNum: GlobalTool.getRandomNum(0, 2),
        award: "每人一个鸡腿",
        desc: "让你白跑没商量"
    },
    {
        name: "脂肪燃烧",
        type: TYPE.HEAT,
        difficulty: DIFFICULTY.WORD,
        tags: ['卡路里', '共享单车'],
        teamNum: GlobalTool.getRandomNum(1, 5),
        countNum: GlobalTool.getRandomNum(10, 50),
        finishNum: GlobalTool.getRandomNum(0, 2),
        award: "每人一台共享单车",
        desc: "燃烧你的卡路里~"
    },
    {
        name: "你瘦了",
        type: TYPE.HEAT,
        difficulty: DIFFICULTY.PARADISE,
        tags: ['帅哥'],
        teamNum: GlobalTool.getRandomNum(1, 5),
        countNum: GlobalTool.getRandomNum(10, 50),
        finishNum: GlobalTool.getRandomNum(0, 2),
        award: "奖励凤姐给你",
        desc: "谁让你瘦的"
    },
];