import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';



function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function ElevateAppBar(props) {
    const text = 'https://twitter.com/intent/tweet?text='+encodeURIComponent('#無限スクロール猫\n無限にスクロールして無限に猫が見れるサイト https://infinity-cat.netlify.app/')
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">
                            無限スクロール猫
                            <a href={text}>
                            <IconButton style={{ color: "#00acee", backgroundColor: "00acee" }}>
                                <TwitterIcon />
                            </IconButton>
                            </a>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container></Container>
        </React.Fragment>
    );
}
