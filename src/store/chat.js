export default {
    state() {
        return {
            friendList: [],
            groupList: [],
            mergeList: [],
            currentChatObj: null,
            websocket: null,
            recordList:[],
            emojiList: [
                {
                    "url": "Expression_0.png",
                    alt: "[微笑]"
                }, {
                    "url": "Expression_1.png",
                    alt: "[撇嘴]"
                }, {
                    "url": "Expression_2.png",
                    alt: "[眨眼]"
                }, {
                    "url": "Expression_3.png",
                    alt: "[乖巧]"
                }, {
                    "url": "Expression_4.png",
                    alt: "[色]"
                }, {
                    "url": "Expression_5.png",
                    alt: "[呲牙]"
                }, {
                    "url": "Expression_6.png",
                    alt: "[流泪]"
                }, {
                    "url": "Expression_7.png",
                    alt: "[可爱]"
                }, {
                    "url": "Expression_8.png",
                    alt: "[难过]"
                }, {
                    "url": "Expression_9.png",
                    alt: "[失望]"
                }, {
                    "url": "Expression_10.png",
                    alt: "[鼻涕]"
                }, {
                    "url": "Expression_11.png",
                    alt: "[冷汗]"
                }, {
                    "url": "Expression_12.png",
                    alt: "[调皮]"
                }, {
                    "url": "Expression_13.png",
                    alt: "[开心]"
                }, {
                    "url": "Expression_14.png",
                    alt: "[悲伤]"
                }, {
                    "url": "Expression_15.png",
                    alt: "[流汗]"
                }, {
                    "url": "Expression_16.png",
                    alt: "[酷]"
                }, {
                    "url": "Expression_17.png",
                    alt: "[微笑]"
                }, {
                    "url": "Expression_18.png",
                    alt: "[抓狂]"
                }, {
                    "url": "Expression_19.png",
                    alt: "[皱眉]"
                }, {
                    "url": "Expression_20.png",
                    alt: "[大笑]"
                }, {
                    "url": "Expression_21.png",
                    alt: "[快乐]"
                }, {
                    "url": "Expression_22.png",
                    alt: "[眯眼]"
                }, {
                    "url": "Expression_23.png",
                    alt: "[衰]"
                },
                {
                    "url": "Expression_24.png",
                    alt: "[高兴]"
                }, {
                    "url": "Expression_25.png",
                    alt: "[笑哭]"
                }, {
                    "url": "Expression_26.png",
                    alt: "[学习]"
                }, {
                    "url": "Expression_27.png",
                    alt: "[萌]"
                }, {
                    "url": "Expression_28.png",
                    alt: "[闭嘴]"
                }, {
                    "url": "Expression_29.png",
                    alt: "[飞吻]"
                }, {
                    "url": "Expression_30.png",
                    alt: "[撇嘴]"
                }, {
                    "url": "Expression_31.png",
                    alt: "[色眯眯]"
                }, {
                    "url": "Expression_32.png",
                    alt: "[傲娇]"
                }, {
                    "url": "Expression_33.png",
                    alt: "[不屑]"
                }, {
                    "url": "Expression_34.png",
                    alt: "[尴尬]"
                }, {
                    "url": "Expression_35.png",
                    alt: "[吃饱了]"
                }
            ],
            groupChatUser:[]
        }
    },
    mutations: {
        set_friendList(state, obj) {
            state.friendList = obj;
        },
        set_groupList(state, obj) {
            state.groupList = obj;
        },
        set_mergeList(state, obj) {
            state.mergeList = obj;
        },
        set_currentChatObj(state, obj) {
            state.currentChatObj = obj;
        },
        set_websocket(state, obj) {
            state.websocket = obj;
        },
        set_recordList(state, obj) {
            state.recordList = obj;
        },
        set_groupChatUser(state, obj) {
            state.groupChatUser = obj;
        },
    }
}
