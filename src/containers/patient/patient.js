/**
 * Created by S jawwad hashmi on 1/28/2017.
 */
import React, { Component, PropTypes } from 'react'
import firebase from 'firebase';
import { Link } from 'react-router'
import { donarActions } from '../../action/donar';
// Components
import LoginForm from '../../components/signinform/signinform'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import * as MUI from 'material-ui'
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
const buttonStyle = { width: '100%' }
const fieldStyle = { width: '80%' }

import {browserHistory} from 'react-router';
// redux/firebase
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton'

import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop:'100px'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

const items = [
    <MenuItem key={1} value={1} primaryText="B+" />,
    <MenuItem key={2} value={2} primaryText="B-" />,
    <MenuItem key={3} value={3} primaryText="O+" />,
    <MenuItem key={4} value={4} primaryText="O-" />,
    <MenuItem key={5} value={5} primaryText="A+" />,
    <MenuItem key={6} value={6} primaryText="A-" />,
];
class patients extends Component {


    componentDidMount() {

        this.props.getdonarSlots(this.props.params.patientid)

    }
    showUsersList(users) {
        if(!users) {
            return [];
        }
        console.log(users)
        return Object.keys(users).reduce(
            (list, uid) => {
                return [
                    ...list,
                    {
                        uid,
                        ...users[uid]
                    }
                ];
            }, []);

    }
    componentWillReceiveProps (nextProps) {


    }



    state = {
        finished: false,
        stepIndex: 0,
        startDate: null,
        startTime:null,
        endTime:null,
    };
    handleChange = (event, index, value) =>

        this.setState(
            {value:value
                ,bloodgroup:event.nativeEvent.target.innerText
            });

    handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
    });
};

    _handleStartDate = (event, date) => {

            var currentState = this.state;
            currentState.startDate = date;
            this.setState(currentState);

    };
    _handleStartTime = (event, time) => {
        var currentState = this.state;
        currentState.startTime = time;
        this.setState(currentState);
    };
    _handleEndTime = (event, time) => {
        var currentState = this.state;
        currentState.endTime = time;
        this.setState(currentState);
    };
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    handleSubmit = () => {
      console.log(this.state)

        this.props.updatedonarSlots(this.state)
        //browserHistory.push('/');
    };

    handleFeedback = () => {
      console.log(this.state)


    };

    onDelete = (e) => {
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
              const data ={
                  slotid : this.props.params.patientid,
                  userid:this.props.auth.auth.user.uid
              }
        this.props.canceldonarSlots(data)

    };


    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div>
                    <TextField
                        hintText='First Name'
                        floatingLabelText='First Name'
                        onChange={({ target }) => { this.setState({name: target.value}) }}
                        style={fieldStyle}/>
                    <TextField
                        hintText='Last Name'
                        floatingLabelText='Last Name'
                        onChange={({ target }) => { this.setState({lastName: target.value}) }}
                        style={fieldStyle}/>
                    <TextField
                        hintText='Phone Number'
                        floatingLabelText='Phone Number'
                        onChange={({ target }) => { this.setState({phoneNo: target.value}) }}
                        style={fieldStyle}/>
                </div>;
            case 1:
                return <SelectField
                    value={this.state.value}
                    onChange={this.handleChange}
                    floatingLabelText="Enter your Blood Group"
                    floatingLabelFixed={true}
                    hintText="Blood Groups"
                >
                    {items}
                </SelectField>
                case 2:
                return   <DatePicker
                    hintText="Starting Date" value={this.state.startDate}  onChange={this._handleStartDate}  mode="landscape" />
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
    handlefinish = (data) => {


        var currentState = this.state;
        currentState.data = data;
        currentState.user=this.props.auth.auth.user.lastName,
        currentState.userid=this.props.auth.auth.user.uid,
        currentState.slotid=this.props.params.patientid
        this.setState(currentState);


    };

    render () {

        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        let iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        let rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={this.onDelete} >cancel reservation</MenuItem>
            </IconMenu>
        );


        return (
            <div>
                <Tabs>
                    <Tab label="Donars" >

                        <div>
                            <h1>Donars List</h1>

                            {
                                this.props.donars.isloaded ?



                                    <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                                <CardHeader
                                title={   this.props.donars.donarData.name +" "+this.props.donars.donarData.lastName }
                                subtitle={ this.props.donars.donarData.bloodgroup}
                                avatar={this.props.donars.donarData.url}
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                                <CardText>

                                </CardText>
                                <CardMedia
                                expandable={true}
                                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                                >
                                <img src={this.props.donars.donarData.url}/>
                                </CardMedia>
                                <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
                                <CardText expandable={true}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <RaisedButton
                                        label="Reserved Blood"
                                        secondary={true}
                                    />
                                </CardActions>

                                </Card>


                                    :''
                            }



                        </div>

                    </Tab>
                    <Tab label="Register Donars" >
                        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                            <Stepper activeStep={stepIndex}>
                                <Step>
                                    <StepLabel>Enter Your Details</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Enter blood group</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Enter donation date</StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>Thanks for donating Blood</StepLabel>
                                </Step>
                            </Stepper>

                            <div style={contentStyle}>
                                {finished ? (
                                        <p>
                                            <RaisedButton
                                                label='finish'
                                                secondary={true}
                                                onTouchTap={this.handleSubmit}
                                            />
                                        </p>
                                    ) : (
                                        <div>
                                            <p>{this.getStepContent(stepIndex)}</p>
                                            <div style={{marginTop: 12}}>
                                                <FlatButton
                                                    label="Back"
                                                    disabled={stepIndex === 0}
                                                    onTouchTap={this.handlePrev}
                                                    style={{marginRight: 12}}
                                                />
                                                <RaisedButton
                                                    label={stepIndex === 4 ? '' : 'Next'}
                                                    primary={true}
                                                    onTouchTap={this.handleNext}
                                                />

                                            </div>

                                        </div>
                                    )}
                            </div>
                        </div>

                       {/* <div style={styles.root}>
                            {
                                this.props.donars.isloaded ?
                                    <GridList style={styles.gridList} cols={2.2}>
                                        { this.props.donars.isloaded ? this.showUsersList(this.props.donars.donarData).map(tile =>
                                                <GridTile
                                                    key={tile.url}
                                                    title={tile.name + ' ' +tile.bookedbyName }
                                                    actionIcon={<IconButton ><StarBorder color={ tile.donar ?'red':'rgb(0, 188, 212)'} /></IconButton>}
                                                    titleStyle={styles.titleStyle}
                                                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                                    onTouchTap={this.handlefinish.bind(this, tile)}
                                                >
                                                    <img src={tile.url} />
                                                </GridTile>
                                            ):''}
                                    </GridList>:''
                        }

                        </div>*/}
                    </Tab>

                   {/* <Tab
                        label="Cancel reservation"
                    >

                        <List>
                            <Subheader>Today</Subheader>

                            {
                                this.props.donars.isloaded ? this.showUsersList(this.props.donars.donarData).map(tile =>

                                        tile.bookedby == this.props.auth.auth.user.uid ?
                                            <div>
                                            <ListItem
                                                leftAvatar={<Avatar src={tile.url} />}
                                                rightIconButton={rightIconMenu}
                                                primaryText={tile.bookedbyName}
                                                secondaryText={
                                                    <p>
                                                        <span style={{color: darkBlack}}>{tile.name}</span><br />
                                                        I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                                                    </p>
                                                }
                                                secondaryTextLines={2}
                                            />
                                                <Divider inset={true} />
                                            </div>
                                            :''

                                    ):''}

                        </List>
                    </Tab>
                    <Tab
                        label="Feedback"
                    >
                        <div>
                            <form style={{padding: '16px',margin:'0px'}} className='LoginForm'  >
                                <TextField
                                    floatingLabelText='Enter your feedback'
                                    name="feedback"
                                    onChange={({ target }) => { this.setState({feedback: target.value}) }}
                                    style={fieldStyle}
                                />

                                <div className='LoginForm-Submit'>
                                    <RaisedButton
                                        label='Send'
                                        primary
                                        type='submit'
                                        style={buttonStyle}
                                    />
                                </div>
                            </form>
                        </div>
                    </Tab>*/}
                </Tabs>
            </div>
        )
    }
/*
    render () {

        return (
            <div>
              <h1>welcome to slots</h1>

                {
                    this.props.donars.isloaded ? this.showUsersList(this.props.donars.donarData).map(user =>
                            <div>{user.name}</div>

                        ):''
                }
            </div>
        )
    }*/
}



//=====================================
//  CONNECT
//-------------------------------------


const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state,
        patients: state.patientData,
        donars: state.donarData
    };
};

export default connect(mapStateToProps, donarActions)(patients);