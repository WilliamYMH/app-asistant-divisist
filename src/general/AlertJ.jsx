import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { isEmpty } from './validators';

class AlertJ extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            severity: this.props.severity,
            alertTitle: this.props.alertTitle,
            open: this.props.alertTitle,
            classes:this.useStyles(),
        };

        this.unmountComponent = this.unmountComponent.bind(this);
        this.setOpen = this.setOpen.bind(this);

    }

    componentDidMount() {
    }

    componentWillMount() {
        this.setState({
            classes:this.useStyles(),
        })
    }

    unmountComponent(evt) {
        if (evt) {
            evt.preventDefault();
        }
    }

    setOpen(open_) {
        this.setState({
            open: open_,
        });
    }

    useStyles() {
        return makeStyles((theme) => ({
            root: {
                width: '100%',
                '& > * + *': {
                    marginTop: theme.spacing(2),
                },
            },
        }));

    }

    render() {

        return (
            <div className={this.state.classes.root}>
                <Collapse in={this.state.open}>
                    <Alert
                        severity={this.state.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    this.setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {!isEmpty(this.state.alertTitle) &&
                            <AlertTitle>{this.state.alertTitle}</AlertTitle>
                        }
                        {this.state.description}
                    </Alert>
                </Collapse>

            </div>
        );
    }
}

AlertJ.propTypes = {
};

export default AlertJ;
