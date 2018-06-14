/**
 * Created by Yaroslav on 04.06.2018.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button, PermissionsAndroid, Image } from 'react-native';
import Camera from 'react-native-camera';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import {API} from '../../constants/appConfig';
import Loader from '../layers/loader';
import Dialog from '../layers/dialog';
import * as locationActions from '../../actions/locationActions';



class AddPlace extends Component {

    constructor(props){
        super(props);
        this.state = {
            isPhotoTaken: false,
            filePhotoUrl: '',
            loader: false,
            dialog: false
        }
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                this.props.navigator.push({
                    title: 'MapPage',
                    animationType: 'FloatFromBottom'
                })
            }
        } catch (err) {
            console.warn(err)
        }
    }

    async requestStoragePermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                this.props.navigator.push({
                    title: 'MapPage',
                    animationType: 'FloatFromBottom'
                })
            }
        } catch (err) {
            console.warn(err)
        }
    }

    remakePhoto() {
        let photoPath = this.state.filePhotoUrl.split('///').pop();
        RNFS.unlink(photoPath)
            .then(() => {
                //FILE_DELETED
                this.setState({
                    isPhotoTaken: false,
                    filePhotoUrl: ''
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    sendParkPlace() {
        let self = this;
        //this.props.locationActions.getCurrentPosition();
        navigator.geolocation.getCurrentPosition(success, error, options);

        let options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 60000
        };

        function success(position) {
            // self.props.locationActions.setNewLocation({
            //     lat: Number(position.coords.latitude),
            //     lon: Number(position.coords.longitude)
            // });

            self.sendPhoto();
        }

        function error(err) {
            console.log('_ERROR_: AddPlace', err);
        }

    }

    sendPhoto() {
        const url = `${API}offerparking/`;
        const file = {
            uri: this.state.filePhotoUrl,
            name: this.state.filePhotoUrl.split('/').pop(),
            type: 'image/jpg',
        };

        const body = new FormData();
        body.append('file', file);
        body.append('from_user_id', '23');
        body.append('location', JSON.stringify(this.props.location));

        fetch(url, {
            method: 'POST',
            body
        }).then( response => {
            if (response.status === 200) {
                return response;
            } else {
                throw new Error('Something went wrong on api server!');
            }
        }).then( response => {
            this.setState({
                isPhotoTaken: false,
                loader: false,
                dialog: true
            });
        }).catch( error => {
            console.log('_ERROR_:', error);
        });
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                this.setState({
                    isPhotoTaken: true,
                    filePhotoUrl: data.path
                });
            })
            .catch(err => console.error(err));
    }

    render() {
        this.requestCameraPermission();
        this.requestStoragePermission();

        let finishedPhoto = <View style={styles.thanks}>
            <Image
                style={styles.finishedPhoto}
                source={{isStatic:true, uri: this.state.filePhotoUrl}}  />
            <View style={styles.botBtn}>
                <Ripple
                    onPress={()=>{
                        this.setState({
                            loader: true
                        },
                            this.sendParkPlace.bind(this)
                        );
                    }}
                    rippleColor={'#FFFFFF'}
                    rippleOpacity={0.6}
                    rippleDuration={800}
                    style={{...styles.stdBtn, marginRight: 1}}>
                    <Icon style={styles.stdBtnIcon} name={'paper-plane-o'} />
                    <Text style={styles.stdBtnText}>SEND {this.props.location.lat}</Text>
                </Ripple>
                <Ripple
                    onPress={this.remakePhoto.bind(this)}
                    rippleColor={'#FFFFFF'}
                    rippleOpacity={0.6}
                    rippleDuration={800}
                    style={styles.stdBtn}>
                    <Icon style={styles.stdBtnIcon} name={'camera'} />
                    <Text style={styles.stdBtnText}>Remake photo</Text>
                </Ripple>
            </View>
        </View> ;



        return (
            <View style={styles.addPlace}>
                {(this.state.isPhotoTaken)? finishedPhoto :
                        <Camera
                            ref={(cam) => {
                            this.camera = cam;
                            }}
                            captureQuality={Camera.constants.CaptureQuality["720p"]}
                            style={styles.preview}>
                            <Icon style={styles.photoBtn} name={'camera'} onPress={this.takePicture.bind(this)} />
                        </Camera>
                }
                {(this.state.loader)? <Loader /> : null}
                {(this.state.dialog)? <Dialog
                                        title={'Thank you!'}
                                        text={'Thank you for adding parking. It will appear in the system after verification by the moderator.'}
                                        btnActions={[
                                            {
                                                'title':'OK',
                                                'action': ()=>{
                                                    this.setState({
                                                        dialog: false
                                                    });
                                                    this.props.navigator.pop();
                                                }
                                            }
                                        ]} />: null }
            </View>
        )
    }

}

const styles = {
    addPlace: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: '#064A56'
    },
    photoBtn: {
        fontSize: 45,
        color: '#FF6D64'
    },
    finishedPhoto: {
        flex: 1
    },
    thanks: {
        flex: 1,
    },
    botBtn: {
        flexDirection: 'row',
    },
    stdBtn: {
        height: 55,
        flexGrow: 1,
        backgroundColor: '#FF6D64',
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stdBtnText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    stdBtnIcon: {
        fontSize: 23,
        color: '#FFFFFF',
        marginRight: 5
    },
    overlay: {
        backgroundColor: 'rgba(7,76,87,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
};

function mapStateToProps (store) {
    return {
        location: store.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        locationActions: bindActionCreators(locationActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace)