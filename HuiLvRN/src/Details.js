/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';

export default class Details extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({

        headerTitle: '各国货币代号',
        //设置滑动返回的距离
        gestureResponseDistance: {horizontal: 300},

        //是否开启手势滑动返回，android 默认关闭 ios打开
        // gesturesEnabled: true,

        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //导航栏的样式
        headerStyle: styles.headerStyle,
        //导航栏文字的样式
        headerTitleStyle: styles.headerTitleStyle,
        //返回按钮的颜色
        headerTintColor: 'white',

        //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
        headerRight: (<View/>),

        //设置导航栏左边的视图
        // headerLeft: (<View/>),

    });

    constructor(props) {
        super(props);
        this.state = {
            data: [],//存储列表使用的数据
            refreshing: false,//当前的刷新状态
        };
    }


    getView({item}) {
        //这里返回的就是每个Item
        return (
            <View style={styles.item}>
                <View style={{flexDirection:'column'}}>
                    <Text  style={{marginLeft:20,marginTop:20}}>货币名：   {item.name}</Text>
                    <Text style={{marginLeft:20,marginTop:14}}>代号：       {item.code}</Text>
                    <View style={{backgroundColor:'gray',marginLeft:10,marginRight:10,height:1,marginTop:14}}></View>
                </View>
            </View>

        )
    };

    /**
     * 给列表设置id
     * @param item
     * @param index
     */
    // keyExtractor = (item, index) => index.id+index;

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
     * json 数据实体类
     */
    ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
    }

    //渲染完成，请求网络数据
    componentDidMount() {

        fetch('http://apicloud.mob.com/exchange/currency/query?key=27e98bbb155b8')
            .then((response) => response.json())
            .then((response) => {
                // alert(JSON.stringify(response))
                var json =  response['result'];
                console.log('dsdsvvvvvvdsds');
                //更新状态机
                this.setState({


                    data: json,

                });
            })
            .catch((error) => {
                if (error) {
                    //网络错误处理
                    console.log('error', error);
                    console.log('----------------------------');
                }
            });

    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.getView}
                    //下拉刷新，必须设置refreshing状态
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerStyle: {
        backgroundColor: 'brown',
    },
    headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },
});

