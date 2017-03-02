/**
 * Created by Admin on 12/28/2016.
 */
import React, { Component,PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import UsersList from '../../components/userList/userList';
import LoginForm from '../../components/signinform/signinform'
import { patientActions } from '../../action/patient';
class user extends Component {
static propTypes = {
      auth: PropTypes.object.isRequired,
  }

    componentDidMount() {
        this.props.getpatient()

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
    render () {





   const { dispatch, patients ,auth } = this.props;

        return (
<div>
            {
        !this.props.children ? <div style={{display: 'inline-flex', margin: '20px'}}>


                {

                    this.props.patients.isloaded ? this.showUsersList(this.props.patients.patientData).map(user =>

                            <Card style={{width: '300px', marginLeft: '5px', marginRight: '30px'}}>


                                <CardMedia
                                >
                                    <img src={user.url} style={{}}/>
                                </CardMedia>
                                <CardTitle style={{textDecoration:'none'}} title={
                                    <Link  style={{textDecoration:'none'}} to={`/${this.props.params.userid}/patients/${user.uid}` }>
                                        {user.name+" "+user.lastName}
                                    </Link>
                                } subtitle={user.bloodgroup}/>
                                <CardText>

                                    {user.name}
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                </CardText>
                            </Card>
                        ) : ''



                }
            </div> :<div>{this.props.children}</div>

         }


</div>
        )
    }
}




const mapStateToProps = (state) => {
  console.log("users page "+state)
	return {

        auth: state.auth ,
        patients: state.patientData
        };
};

export default connect(mapStateToProps,patientActions)(user);