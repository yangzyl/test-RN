import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ToastAndroid,
} from 'react-native';
import Swiper from 'react-native-swiper'
var Dimensions = require('Dimensions'); //必须要写这一行，否则报错，无法找到这个变量
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var ScreenScale = Dimensions.get('window').scale;
import HttpUtils from './HttpUtils'
export default class Home extends Component {

    static defaultProps = {
        url: 'http://route.showapi.com/105-32'
    };

        constructor(props) {
        super(props);
        this.state = {
            data: [],//存储列表使用的数据
            time_str:null,
            refreshing: false,//当前的刷新状态
        };
    }

            /**
     * 头布局
     */
    header = () => {
        return (
            <View style={{flexDirection:'row',height:60,alignItems:'center'}}>
                <View style={{flexDirection:'column',justifyContent:'center',marginLeft:20,alignItems:'center'}}>
                    <Text style={{color:"gray"}}>今日时间</Text>
                    <Text style={{marginTop:5}}>{this.state.time_str}</Text>
                </View>
                <Text style={{marginLeft:30,color:'gray'}}>所有数据以100人民币为基准</Text>
            </View>
        )
    };


    getView({item}) {
        //这里返回的就是每个Item
        return (
                <View style={styles.item}>
                    <View style={{flexDirection:'row',marginLeft:40,marginTop:15}}>
                        <Text>币种</Text>
                        <Text style={{marginLeft:110}}>{item.name}===>人民币</Text>
                    </View>
                    <View style={{backgroundColor:'gray',marginLeft:10,marginRight:10,height:1,marginTop:13}}></View>
                    <View style={{flexDirection:'row',marginLeft:40,marginTop:13}}>
                        <Text>币种代号</Text>
                        <Text style={{marginLeft:110}}>{item.code}</Text>
                    </View>
                    <View style={{backgroundColor:'gray',marginLeft:10,marginRight:10,height:1,marginTop:13}}></View>
                    <View style={{flexDirection:'row',marginLeft:40,marginTop:13}}>
                        <Text>现汇卖出价</Text>
                        <Text style={{marginLeft:90,color:'blue',fontSize:19,fontWeight:'bold'}}>{item.hui_out}</Text>
                    </View>
                    <View style={{backgroundColor:'gray',marginLeft:10,marginRight:10,height:1,marginTop:13}}></View>
                    <View style={{flexDirection:'row',marginLeft:40,marginTop:13}}>
                        <Text>现汇买入价</Text>
                        <Text style={{marginLeft:90,color:'red',fontSize:22,fontWeight:'bold'}}>{item.hui_in}</Text>
                    </View>
                    <View style={{backgroundColor:'gray',marginLeft:10,marginRight:10,height:1,marginTop:13}}></View>
                    <View style={{flexDirection:'row',marginLeft:40,marginTop:13}}>
                        <Text>现钞卖出价</Text>
                        <Text style={{marginLeft:90,color:'blue',fontSize:19,fontWeight:'bold'}}>{item.chao_out}</Text>
                    </View>
                    <View style={{backgroundColor:'gray',marginLeft:10,marginRight:10,height:1,marginTop:13}}></View>
                    <View style={{flexDirection:'row',marginLeft:40,marginTop:13,marginBottom:15}}>
                        <Text>现钞买入价</Text>
                        <Text style={{marginLeft:90,color:'red',fontSize:22,fontWeight:'bold'}}>{item.chao_in}</Text>
                    </View>
                </View>

        )
    };

    /**
     * 给列表设置id
     * @param item
     * @param index
     */
    keyExtractor = (item, index) => item.toString();

    /**
     * 下拉属性
     */
    onRefresh = () => {
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
        });
        //延时加载
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.setState({
                refreshing: false,
            });
        }, 1500);
    };

    /**
     * 上拉加载
     * 2017.10.23 11:03 还有一些问题
     */
    onEndReached = (info: { distanceFromEnd: number }) => {
        ToastAndroid.show('正在加载中...', ToastAndroid.SHORT);

    };

    /**
     * json 数据实体类
     */
    ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
    }

    //渲染完成，请求网络数据
    componentDidMount() {
        // let formData = new FormData();
        // formData.append("showapi_appid","72569");
        // formData.append("showapi_sign","16832f34ea984854a4d3b9c190a65427");
        // formData.append("bankCode","icbc");
        //
        // fetch('http://route.showapi.com/105-32?showapi_appid=72569&showapi_sign=16832f34ea984854a4d3b9c190a65427&bankCode=icbc')
        //     .then((response) => response.json())
        //     .then((response) => {
        //         // alert(JSON.stringify(response))
        //         var json =  response['showapi_res_body']['codeList'];
        //         //更新状态机
        //         this.setState({
        //             time_str:response['showapi_res_body']['day']+'    '+response['showapi_res_body']['time'],
        //             data: json,
        //
        //         });
        //     })
        //     .catch((error) => {
        //         if (error) {
        //             //网络错误处理
        //             console.log('error', error);
        //             console.log('----------------------------');
        //         }
        //     });

    }

    render() {

        return (
            <View style={styles.container}>
                                 <FlatList
                                    data={this.state.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this.getView}
                                    ListHeaderComponent={this.header}
                                    //指定为GridView效果，需要下面两个属性同时设置，且numColumns必须大于1
                                    // numColumns={2}
                                    // columnWrapperStyle={{borderWidth: 2, borderColor: 'black'}}

                                    //下拉刷新，必须设置refreshing状态
                                    onRefresh={this.onRefresh}
                                    refreshing={this.state.refreshing}

                                    //上拉加载
                                    // onEndReachedThreshold={0}
                                    // onEndReached={this.onEndReached}
                                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: 120,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    },

    swiper: {
    },
    img: {
        width: ScreenWidth,
        height: 200,
    },
        item: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        width: 90,
        height: 90,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,

    },
    left: {
        flex: 1,
        marginLeft: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    //让 Text 水平方向充满容器
    content: {
        bottom: 10,
        marginRight: 16,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }

});