/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Button,
    View
} from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';

//首页的页面
import Home from './src/Home';
import Mine from './src/Mine';

import Details from './src/Details';
//侧滑菜单的页面
import Wallet from "./src/drawer/Wallet";
import CardCoupons from "./src/drawer/CardCoupons";
import Invite from "./src/drawer/Invite";

/**
 * 配置底部标签
 */
const Tab = TabNavigator({
    //每一个页面的配置
    Home: {
        screen: Home,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '银行实时汇率',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: 'brown'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '银行实时汇率',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_home.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),

        },
    },

    Mine: {
        screen: Mine,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '汇率换算',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: 'blue'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            // headerRight:(
            //     <View>
            //         <Button
            //             title="点我"
            //             onPress={() => this.navigation.navigate('Details')}
            //         />
            //     </View>
            // ),
            //tab 的属性
            tabBarLabel: '汇率换算',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_me.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        }
    },

}, {
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: true,
    //是否允许在标签之间进行滑动
    swipeEnabled: true,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
    //设置Tab标签的属性

    tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: 'blue',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: 55,
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 13,
            marginTop: -5,
            marginBottom: 5,
        },
        iconStyle: {//图标的样式
            marginBottom: 5,
        }
    },
});

/*
 * 配置堆栈导航
 */
const Stack = StackNavigator({
    Tab: {
        screen: Tab,
    },
    Details: {
        screen: Details,
    },

    //DrawerNavigator跳转的页面也必须在这里注册
    Wallet: {
        screen: Wallet,
    },
    CardCoupons: {
        screen: CardCoupons,
    },
    Invite: {
        screen: Invite,
    },
});


/**
 * 配置侧滑菜单
 */
export default Drawer = DrawerNavigator({
    Home: {
        screen: Stack,
        navigationOptions: {
            drawerLabel: '银行实时汇率',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_home.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Wallet: {
        screen: Wallet,
        navigationOptions: {
            drawerLabel: '我的钱包',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={require('./images/wallet.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    CardCoupons: {
        screen: CardCoupons,
        navigationOptions: {
            drawerLabel: '我的卡券',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={require('./images/cardcoupons.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Invite: {
        screen: Invite,
        navigationOptions: {
            drawerLabel: '邀请好友',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={require('./images/invite.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },

}, {
    drawerWidth: 250, // 展示的宽度
    drawerPosition: 'right', // 抽屉在左边还是右边
    // contentOptions: {
    //     // activeTintColor: 'black',  // 选中文字颜色
    //     activeBackgroundColor: '#fff', // 选中背景颜色
    //     inactiveTintColor: '#EB3695',  // 未选中文字颜色
    //     inactiveBackgroundColor: '#fff', // 未选中背景颜色
    //     style: {  // 样式
    //
    //     }
    // },
});
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    }
});
