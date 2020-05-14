export const styles = {
    Main: {
        ['@media (max-width:768px)'] : {
            textAlign: 'center'
        }
    },
    textfieldPadding: {
        paddingTop: '25px',
        fontStyle: 'italic',
        fontSize: 12
    },
    btnPadding: {
        paddingTop: '20px'
    },
    balanceBox: {
        margin: '15px',
        display: 'inline-block',
        ['@media (max-width:768px)'] : {
            margin: '0 auto'
        }
    },
    btn: {
        marginBottom: '24px',
        marginRight: '12px',
        padding: '16px',
        minWidth: 200,
        fontWeight: 'bold'
    },
    btnHover: {
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'purple'
        },
        '&:active': {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'purple'
        }
    },
    disabledBg: {
        backgroundColor: 'gray',
        color: 'gainsboro',
        cursor: 'no-drop',
        '&:hover': {
            backgroundColor: 'gray',
            color: 'gainsboro',
        },
        '&:active': {
            backgroundColor: 'gray',
            color: 'gainsboro',
        }
    },
    indigoBg: {
        backgroundColor: 'indigo',
        color: 'whitesmoke'
    },
    purpleBg: {
        backgroundColor: 'purple',
        color: 'whitesmoke'
    },
    pinkBg: {
        backgroundColor: 'deeppink',
        color: 'whitesmoke'
    },
    formItem: {
        width: '250px'
    },
    commonerLink: {
        textDecoration: "none",
        fontWeight: "bold",
        color: "fuchsia"
    },
    litterText: {
        fontSize: 12,
        fontStyle: "italic",
        display: "inline-block"
    },
    centeredBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    strongTxt: {
        fontWeight: 'bold'
    },
    noDec: {
        textDecoration: 'none',
        color: 'fuchsia'
    },
    warningPaper: {
        backgroundColor: '#383838',
        padding: '10px',
        minWidth: '150px',
        margin: '15px',
        color: 'white'
    },
    blackCard: {
        backgroundColor: 'black',
        color: 'white',
        display: 'inline-block',
        width: '150px',
        height: '200px',
        margin: '15px'
    },
    whiteCard: {
        backgroundColor: 'white',
        color: 'black',
        display: 'inline-block',
        width: '100px',
        height: '150px',
        margin: '15px 5px'
    },
    cardset: {
        backgroundColor: 'moccasin',
        margin: '5px 5px',
        padding: '0px 10px',
        '&:hover': {
            backgroundColor: 'darkkhaki',
            cursor: 'pointer'
        }
    },
    rootSmtg: {
        '& label.Mui-focused': {
            color: 'indigo',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'indigo',
            },
        },
    },
}