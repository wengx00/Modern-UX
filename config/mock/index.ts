export default {
  'GET /api/getTodoList': {
    code: 200,
    msg: 'OK',
    data: [
      {
        id: 1,
        title: '学习 LightHouse 各项指标和量化依据',
        subtitle: '下周四做组内技术分享',
        lane: 1,
        progress: 0,
        remark: '',
        location: '',
        tag: [
          {
            id: 1,
            label: '性能优化',
            color: '#ff4d4f',
          },
        ],
        startTime: '2024-04-01 00:00:00',
        endTime: '2024-04-21 00:00:00',
      },
      {
        id: 2,
        title: '探究 CDN 优化方案',
        subtitle: '',
        lane: 0,
        progress: 70,
        remark: '',
        location: '',
        tag: [
          {
            id: 2,
            label: '基础设施',
            color: '#1890ff',
          },
        ],
        startTime: null,
        endTime: null,
      },
      {
        id: 3,
        title: '探究 CDN 优化方案2',
        subtitle: '测试的副标题',
        lane: 0,
        progress: 70,
        remark: '',
        location: '',
        tag: [
          {
            id: 2,
            label: '基础设施',
            color: '#1890ff',
          },
        ],
        startTime: null,
        endTime: null,
      },
      {
        id: 4,
        title: '探究 CDN 优化方案3',
        subtitle: '',
        lane: 0,
        progress: 70,
        remark: '',
        location: '',
        tag: [
          {
            id: 2,
            label: '基础设施',
            color: '#1890ff',
          },
        ],
        startTime: null,
        endTime: null,
      },
    ],
  },
}
