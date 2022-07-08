
const CTYPE = (() => {
    let MINUTE = 60000;
    let HOUR = MINUTE * 60;
    let DAY = HOUR * 24;
    let WEEK = DAY * 7;

   

    return {
        MINUTE,
        HOUR,
        DAY,
        WEEK,


        pagination: { pageSize: 10 },

        namespace: {
            default: 'file'
        },
        //图片裁切工具比例
        imgeditorscale: {
            square: 1,
            rectangle_h: 0.5625,
            identity: 0.63
        },
        bannerTypes: {
            banner: Symbol('banner'),
            ad: Symbol('ad'),
            house: Symbol('house'),
            estate: Symbol('estate')
        },

        houseStyles: {
            box: Symbol('box'),
            flat: Symbol('flat')
        },

        colors: ['白色', '红色', '黄色', '土豪金', '绿色', '蓝色', '黑色', '紫色'],

        hint :'Plan + Revised',

        linData : [
            {
              month: 'Jan.',
              value: 6123,
              y:'6k'
            },
            {
              month: 'Feb.',
              value: 8220,
              y:'8k'
            },
            {
              month: 'Mar.',
              value: 2211,
              y:'2k'
            },
            {
              month: 'Apr.',
              value: 2153,
              y:'2k'
            },
            {
              month: 'May.',
              value: 2174,
              y:'2k'
            },
            {
              month: 'Jun.',
              value: 7361,
              y:'7k'
            },
            // {
            //   month: 'Jul.',
            //   value: 53.75,
            // },
            // {
            //   month: 'Aug.',
            //   value: 60.32,
            // },
          ],
          cakeData : [
            {
              name: '长津湖',
              percent: 0.4,
              a: '1',
            },
            {
              name: '我和我的父辈',
              percent: 0.2,
              a: '1',
            },
            {
              name: '失控玩家',
              percent: 0.18,
              a: '1',
            },
            {
              name: '宝可梦',
              percent: 0.15,
              a: '1',
            },
            {
              name: '峰爆',
              percent: 0.05,
              a: '1',
            },
            {
              name: '其他',
              percent: 0.02,
              a: '1',
            },
          ],

          fillerData : [
            {
              value: 62.7,
              city: 'Alaska',
              date: '2011-10-01',
            },
            {
              value: 72.2,
              city: 'Austin',
              date: '2011-10-01',
            },
            {
              value: 59.9,
              city: 'Alaska',
              date: '2011-10-02',
            },
            {
              value: 67.7,
              city: 'Austin',
              date: '2011-10-02',
            },
            {
              value: 59.1,
              city: 'Alaska',
              date: '2011-10-03',
            },
            {
              value: 69.4,
              city: 'Austin',
              date: '2011-10-03',
            },
            {
              value: 58.8,
              city: 'Alaska',
              date: '2011-10-04',
            },
            {
              value: 68,
              city: 'Austin',
              date: '2011-10-04',
            },
            {
              value: 58.7,
              city: 'Alaska',
              date: '2011-10-05',
            },
            {
              value: 72.4,
              city: 'Austin',
              date: '2011-10-05',
            },
            {
              value: 57,
              city: 'Alaska',
              date: '2011-10-06',
            },
            {
              value: 77,
              city: 'Austin',
              date: '2011-10-06',
            },
            {
              value: 56.7,
              city: 'Alaska',
              date: '2011-10-07',
            },
            {
              value: 82.3,
              city: 'Austin',
              date: '2011-10-07',
            },
            {
              value: 56.8,
              city: 'Alaska',
              date: '2011-10-08',
            },
            {
              value: 78.9,
              city: 'Austin',
              date: '2011-10-08',
            },
            {
              value: 56.7,
              city: 'Alaska',
              date: '2011-10-09',
            },
            {
              value: 68.8,
              city: 'Austin',
              date: '2011-10-09',
            },
            {
              value: 60.1,
              city: 'Alaska',
              date: '2011-10-10',
            },
            {
              value: 68.7,
              city: 'Austin',
              date: '2011-10-10',
            },
            {
              value: 61.1,
              city: 'Alaska',
              date: '2011-10-11',
            },
            {
              value: 70.3,
              city: 'Austin',
              date: '2011-10-11',
            },
            {
              value: 61.5,
              city: 'Alaska',
              date: '2011-10-12',
            },
            {
              value: 75.3,
              city: 'Austin',
              date: '2011-10-12',
            },
            {
              value: 64.3,
              city: 'Alaska',
              date: '2011-10-13',
            },
            {
              value: 76.6,
              city: 'Austin',
              date: '2011-10-13',
            },
            {
              value: 67.1,
              city: 'Alaska',
              date: '2011-10-14',
            },
            {
              value: 66.6,
              city: 'Austin',
              date: '2011-10-14',
            },
            {
              value: 64.6,
              city: 'Alaska',
              date: '2011-10-15',
            },
            {
              value: 68,
              city: 'Austin',
              date: '2011-10-15',
            },
            {
              value: 61.6,
              city: 'Alaska',
              date: '2011-10-16',
            },
            {
              value: 70.6,
              city: 'Austin',
              date: '2011-10-16',
            },
            {
              value: 61.1,
              city: 'Alaska',
              date: '2011-10-17',
            },
            {
              value: 71.1,
              city: 'Austin',
              date: '2011-10-17',
            },
            {
              value: 59.2,
              city: 'Alaska',
              date: '2011-10-18',
            },
            {
              value: 70,
              city: 'Austin',
              date: '2011-10-18',
            },
            {
              value: 58.9,
              city: 'Alaska',
              date: '2011-10-19',
            },
            {
              value: 61.6,
              city: 'Austin',
              date: '2011-10-19',
            },
            {
              value: 57.2,
              city: 'Alaska',
              date: '2011-10-20',
            },
            {
              value: 57.4,
              city: 'Austin',
              date: '2011-10-20',
            },
            {
              value: 56.4,
              city: 'Alaska',
              date: '2011-10-21',
            },
            {
              value: 64.3,
              city: 'Austin',
              date: '2011-10-21',
            },
            {
              value: 60.7,
              city: 'Alaska',
              date: '2011-10-22',
            },
            {
              value: 72.4,
              city: 'Austin',
              date: '2011-10-22',
            },
            {
              value: 65.1,
              city: 'Alaska',
              date: '2011-10-23',
            },
            {
              value: 72.4,
              city: 'Austin',
              date: '2011-10-23',
            },
            {
              value: 60.9,
              city: 'Alaska',
              date: '2011-10-24',
            },
            {
              value: 72.5,
              city: 'Austin',
              date: '2011-10-24',
            },
            {
              value: 56.1,
              city: 'Alaska',
              date: '2011-10-25',
            },
            {
              value: 72.7,
              city: 'Austin',
              date: '2011-10-25',
            },
            {
              value: 54.6,
              city: 'Alaska',
              date: '2011-10-26',
            },
            {
              value: 73.4,
              city: 'Austin',
              date: '2011-10-26',
            },
            {
              value: 56.1,
              city: 'Alaska',
              date: '2011-10-27',
            },
            {
              value: 70.7,
              city: 'Austin',
              date: '2011-10-27',
            },
            {
              value: 58.1,
              city: 'Alaska',
              date: '2011-10-28',
            },
            {
              value: 56.8,
              city: 'Austin',
              date: '2011-10-28',
            },
            {
              value: 57.5,
              city: 'Alaska',
              date: '2011-10-29',
            },
            {
              value: 51,
              city: 'Austin',
              date: '2011-10-29',
            },
            {
              value: 57.7,
              city: 'Alaska',
              date: '2011-10-30',
            },
            {
              value: 54.9,
              city: 'Austin',
              date: '2011-10-30',
            },
            {
              value: 55.1,
              city: 'Alaska',
              date: '2011-10-31',
            },
            {
              value: 58.8,
              city: 'Austin',
              date: '2011-10-31',
            },
            {
              value: 57.9,
              city: 'Alaska',
              date: '2011-11-01',
            },
            {
              value: 62.6,
              city: 'Austin',
              date: '2011-11-01',
            },
            {
              value: 64.6,
              city: 'Alaska',
              date: '2011-11-02',
            },
            {
              value: 71,
              city: 'Austin',
              date: '2011-11-02',
            },
          ],
          textData : [
            {
              name: 'London',
              月份: 'Apr.',
              月均降雨量: 81.4,
            },
            {
              name: 'London',
              月份: 'May.',
              月均降雨量: 47,
            },
            {
              name: 'London',
              月份: 'Jun.',
              月均降雨量: 20.3,
            },
            {
              name: 'London',
              月份: 'Jul.',
              月均降雨量: 24,
            },
            {
              name: 'London',
              月份: 'Aug.',
              月均降雨量: 35.6,
            },
            {
              name: 'Berlin',
              月份: 'Apr.',
              月均降雨量: 99.7,
            },
            {
              name: 'Berlin',
              月份: 'May.',
              月均降雨量: 52.6,
            },
            {
              name: 'Berlin',
              月份: 'Jun.',
              月均降雨量: 35.5,
            },
            {
              name: 'Berlin',
              月份: 'Jul.',
              月均降雨量: 37.4,
            },
            {
              name: 'Berlin',
              月份: 'Aug.',
              月均降雨量: 42.4,
            },
          ]
    };
    

})();

export default CTYPE;
