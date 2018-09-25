import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Button,
    ImageBackground,
    SafeAreaView,
    TextInput

} from 'react-native';
var Dimensions = require('Dimensions'); //必须要写这一行，否则报错，无法找到这个变量
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var ScreenScale = Dimensions.get('window').scale;
export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FromText:'PHP',
            ToText:'CNY',
            MoneyText:'100',
            JieGuo:'0'
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({

        headerTitle: '汇率换算',

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

        //隐藏顶部导航栏
        // header: null,

        //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
        headerRight:(
            <View>
                <Button
                    title="各国货币代号"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        ),

        //设置导航栏左边的视图
        // headerLeft: (<View/>),

    });

    GetDataWithMoney(){


        fetch('http://route.showapi.com/105-31?showapi_appid=72569&showapi_sign=16832f34ea984854a4d3b9c190a65427&fromCode='+this.state.FromText+'&toCode='+this.state.ToText+'&money='+this.state.MoneyText)
            .then((response) => response.json())
            .then((response) => {
                // alert(JSON.stringify(response))
                var json =  response['showapi_res_body']['money'];
                //更新状态机
                this.setState({
                    JieGuo: json,

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
            <SafeAreaView>
            <View style={styles.container}>
                <Image source={require('../images/222.png')} style={{position:'absolute',left:0,top:0,width:ScreenWidth,height:ScreenHeight,marginTop:-60,opacity:0.5,alignItems:'center'}}/>
                <View style={{opacity:1.0, width:ScreenWidth - 100,height:ScreenHeight-300,marginTop:100,alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black',fontSize:18,marginTop:10,fontWeight:"bold"}}>从</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1,marginLeft:10,paddingLeft:10,paddingRight:10,fontWeight:"bold"}}
                            onChangeText={(FromText) =>
                                this.setState(
                                    {FromText}
                                    )
                            }
                            value={this.state.FromText}
                        />
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <Text style={{color:'black',marginTop:15,fontWeight:"bold"}}>===></Text>
                        <TextInput
                            style={{height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,paddingRight:10,fontWeight:"bold",marginLeft:20}}
                            onChangeText={(ToText) =>
                                this.setState(
                                    {ToText}
                                )
                            }
                            value={this.state.ToText}
                        />
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <Text style={{color:'black',marginTop:15,fontWeight:"bold"}}>输入币值</Text>
                        <TextInput
                            style={{height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,paddingRight:10,fontWeight:"bold",marginLeft:20}}
                            onChangeText={(MoneyText) =>
                                this.setState(
                                    {MoneyText}
                                )
                            }
                            value={this.state.MoneyText}
                        />
                    </View>
                    <Text style={{marginTop:20,borderRadius:6,borderWidth:1,overflow:'hidden',paddingRight:20,paddingLeft:20,paddingTop:12,paddingBottom:12,fontWeight:'bold',fontSize:25,color:'red'}}>{this.state.JieGuo}元</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={
                        () => {
                            this.GetDataWithMoney();
                        }
                    }>
                    <Text style={{backgroundColor:'brown',paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,color:'white',fontWeight:'bold',fontSize:30,marginTop:26,borderRadius:10,overflow: 'hidden'}}>装换</Text>
                    </TouchableOpacity>
                </View>

            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
    },
    button: {
        width: 120,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    }
});