import React, { useState } from 'react'
import { createPortfolio, updatePortfolio } from '../../../api/portfolioAPI';
import PortfolioHeaderEditor from './MinimalPortfolioHeaderEditor';
import UploadPicture from '../UploadPicture';
import SectionsEditor from './MinimalSectionsEditor';
import PortfolioEditorBar from '../PortfolioEditorBar'
import Icon from '@material-ui/core/Icon';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, createMuiTheme, responsiveFontSizes, MuiThemeProvider} from '@material-ui/core/styles';
import { Tabs, Tab, Box, TextField,Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import UseWindowSize from '../../App/UseWindowSize';
import '../../../views/artTemplateEditor.css'

let resFont = createMuiTheme();
resFont = responsiveFontSizes(resFont);

const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
  },
  field_root: {
    '& > *': {
      marginBottom: theme.spacing(3),
    },
    width: "fit-content",
  },
  grow: {
    flexGrow: 1,
  },
  btn: {
    marginLeft: theme.spacing(1),
  },
  pop: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '18%',
    padding: theme.spacing(3),
  },
  inputCenter: {
    textAlign: 'center',
  },
  username_input: {
    background: "transparent",
    '&:hover': {
      background: "#fafafa",
    },
    "font-family": "monospace, sans-serif",
  },
  introduction_input: {
    background: "transparent",
    '&:hover': {
      background: "#fafafa",
    }
  },
  formal_title_input: {
    background: "transparent",
    '&:hover': {
      background: "#fafafa",
    },
    "font-family": "monospace, sans-serif",
  },
  leisure_title_input: {
    background: "transparent",
    '&:hover': {
      background: "#fafafa",
    },
    "font-family": "monospace, sans-serif",
  },
  contact_title_input: {
    background: "transparent",
    '&:hover': {
      background: "#fafafa",
    },
    "font-family": "monospace, sans-serif",
  },
  contact_detail:{
    "font-family": "monospace, sans-serif",
  },
  contact_content: {
    width: "fit-content",
  },
  contact_input: {
    width: (size) => (size.width * 0.28),
    height: 'fit-content',
    margin: theme.spacing(2),
  },
  paper: {
    //4:5
    width: (size) => (size.width * 0.8),
    height: 'fit-content',
    paddingTop: 65,
    paddingBottom: 65,
    backgroundColor: "#fff",   
  },
  editor: {
    width: "100%",
    height: "100%",
    paddingTop: 45,
    backgroundColor: "transparent"
  },
  editor_form: {    
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    width: "fit-content",
    height:"fit_content"
  },
  portfolio_content: {    
    width: (size) => (size.width * 0.8),
    height: "100%",
    "background-size": "cover",
  },
  text_background: {
    //width:100%
    position: "absolute",
    width: 1000,
    height: 'fit-content',
  },
  header: {
    width: "100%",
    height:100,
  },
  img: {
    //1:1
    "border-style": "outset",
    width: (size) => (size.width * 0.06),
    height: (size) => (size.width * 0.06),
  },
  tabs_font: {
    "font-family": "monospace, sans-serif",
    "font-size": "16px",
    "font-weight": "bold",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid>
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box  position="center" 
        >
          {children}
        </Box>
      )}
    </div>
    </Grid>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function PortfolioEditor(props) {
  // default background
  const defaultBackground1 = "http://res.cloudinary.com/do0ecn2sm/image/upload/v1604059520/vn2lhtgguax4x9u6c7mh.jpg";
  const defaultBackground2 = "http://res.cloudinary.com/do0ecn2sm/image/upload/v1604059253/rfw1ejngp2ctzrxdgg5s.jpg";

 // text background
  const defaultTextBackground1 = "http://res.cloudinary.com/do0ecn2sm/image/upload/v1604106272/b7oonk3pd3czdhlvqh9d.jpg";
  const defaultTextBackground2 = "http://res.cloudinary.com/do0ecn2sm/image/upload/v1604106451/v7rjr1eakwp0wjdugyta.jpg";

  const size = UseWindowSize();
  const classes = useStyles(size);
  const theme = useTheme();
  //use the edge
  let smalleredge = size.height;

  const { _id, portfolioName, template, userName, backgroundImage, homePage, formalPage, leisurePage, contactPage } = props.portfolio;

  const [portfolio_url, setPortfolioURL] = useState("");
  const [portfolio_name_value, setPortfolioName] = useState(portfolioName);

  // user details
  const [user_name_value, setUserName] = useState(userName);
  const [email_value, setEmail] = useState(contactPage.email);
  const [phone_value, setPhone] = useState(contactPage.phone);
  const [profile_photo_value, setProfilePhoto] = useState(homePage.profilePhoto);
  const [introduction_value, setIntroduction] = useState(homePage.description);

  // portfolio backgroung
  const [background_image, setBackground] = useState(backgroundImage);

  // page tags
  const [home_page_tag, setHomePageTag] = useState(homePage.tag);
  const [formal_page_tag, setFormalPageTag] = useState(formalPage.tag);
  const [leisure_page_tag, setLeisurePageTag] = useState(leisurePage.tag);
  const [contact_page_tag, setContactPageTag] = useState(contactPage.tag);

  // page titles
  const [formal_page_title, setFormalPageTitle] = useState(formalPage.title);
  const [leisure_page_title, setLeisurePageTitle] = useState(leisurePage.title);
  const [contact_page_title, setContactPageTitle] = useState(contactPage.title);

  // page sections
  const [formal_page_sections, setFormalPageSections] = useState(formalPage.sections);
  const [leisure_page_sections, setLeisurePageSections] = useState(leisurePage.sections);
 
  // page photos
  const [contact_page_photo, setContactPhoto] = useState(contactPage.photo);

  // page text background
  const [formal_text_background, setFormalTextBackground] = useState(formalPage.textBackground);
  const [leisure_text_background, setLeisureTextBackground] = useState(leisurePage.textBackground);
  const [contact_text_background, setContactTextBackground] = useState(contactPage.textBackground);

  const [value, setValue] = useState(0); // Tabs

  const [open_publish, setOpenPublish] = useState(false); // Dialog
  const [open_cancel, setOpenCancel] = useState(false);
  const [open_redirect, setOpenRedirect] = useState(false);
  const [open_edit_header, setEditHeader] = useState(false);
  

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = () => {
    handlePublish();
    publishPortfolio();
  };

  const handlePublish = () => {
    setOpenPublish(!open_publish);
  };

  const handleCancel = () => {
    setOpenCancel(!open_cancel);
  };

  const handleRedirect = () => {
    setOpenRedirect(true);
  }


  const changeHomePageTab = (val) => { 
    if (!val){
      setHomePageTag("Home");
    }
    else {
      setHomePageTag(val);
    }
  }

  const changeFormalPageTab = (val) => { 
    if (!val){
      setFormalPageTag("About");
    }
    else {
      setFormalPageTag(val);
    }
  }

  const changeLeisurePageTab = (val) => { 
    if (!val){
      setLeisurePageTag("Leisure");
    }
    else {
      setLeisurePageTag(val);
    }
  }

  const changeContactPageTab = (val) => { 
    if (!val){
      setContactPageTag("Contact");
    }
    else {
      setContactPageTag(val);
    }
  }

  const handleOpenHeaderEditor = () => {
    setEditHeader(open_edit_header => !open_edit_header);
  };
  
  const handleClickAwayHeader = () => {
    setEditHeader(false);
  };

  const compareEdge = () => {
    if(size.height>size.width){
      smalleredge=size.width;
    }else{
      smalleredge=size.height;
    }

}

  async function publishPortfolio() {
    handlePublish();
    const portfolio = {
      portfolioID: _id,
      portfolioName: portfolio_name_value,
      template: template,
      userName: user_name_value,
      backgroundImage: background_image,
      homePage: {
        tag: home_page_tag,
        profilePhoto: profile_photo_value,
        description: introduction_value
      },
      formalPage: {
        tag: formal_page_tag,
        title: formal_page_title,
        pagePhoto: formalPage.pagePhoto,
        textBackground: formal_text_background,
        sections: formal_page_sections
      },
      leisurePage: {
        tag: leisure_page_tag,
        title: leisure_page_title,
        pagePhoto: leisurePage.pagePhoto,
        textBackground: leisure_text_background,
        sections: leisure_page_sections
      },
      contactPage: {
        tag: contact_page_tag,
        title: contact_page_title,
        email: email_value,
        phone: phone_value,
        photo: contact_page_photo,
        textBackground: contact_text_background, 
      }
    };

    try {
      // create a new portfolio
      if (_id === '0') {
        const res = await createPortfolio(portfolio);
        setPortfolioURL(res.portfolioURL);
        handleRedirect();
      }
      // update the existing portfolio
      else {
        const res = await updatePortfolio(portfolio);
        setPortfolioURL(res.portfolioURL);
        handleRedirect();
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    };
  }

  return (
   <div className='PageContainer'>
   <Grid>
      <PortfolioEditorBar setPortfolioName={setPortfolioName} 
                          onSubmit={onSubmit} 
                          handleCancel={handleCancel}
                          handlePublish={handlePublish}
                          handleRedirect={handleRedirect}
                          portfolioName={portfolio_name_value}
                          portfolioURL={portfolio_url}
                          open_cancel={open_cancel}
                          open_publish={open_publish}
                          open_redirect={open_redirect}
                          />

      <div className={classes.form}>
      <Grid className={classes.tabs}>
          {value === 0?
            (<Grid container 
              spacing={5}
              direction="column"
              justify="center"
              alignItems="baseline"> 
              <Grid item>
                <MuiThemeProvider theme={resFont}><Typography>Page: {home_page_tag}</Typography></MuiThemeProvider>
              </Grid>

              <Grid container item
                  spacing={3}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">
                <Grid item theme={theme}>
                    <MuiThemeProvider theme={resFont}><Typography>Change Background</Typography></MuiThemeProvider>
                </Grid>

                <Grid container item direction="row" spacing={1}>                  
                  <Grid item>
                    <img className={classes.img} src={defaultBackground1} onClick={()=>setBackground(defaultBackground1)} alt="Default" />
                  </Grid>
                  <Grid item>
                    <img className={classes.img} src={defaultBackground2} onClick={()=>setBackground(defaultBackground2)} alt="Default" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>):null
          }
          {value === 1?
            (<Grid container 
              spacing={5}
              direction="column"
              justify="center"
              alignItems="baseline"> 

              <Grid item>
                <MuiThemeProvider theme={resFont}><Typography>Page: {formal_page_tag}</Typography></MuiThemeProvider>
              </Grid>
              
              <Grid container item spacing={3}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">
                <Grid item>
                    <MuiThemeProvider theme={resFont}><Typography>Change Background</Typography></MuiThemeProvider>
                </Grid>
                <Grid container item direction="row" spacing={1}>                  
                  <Grid item>
                    <img className={classes.img} src={defaultBackground1} onClick={()=>setBackground(defaultBackground1)} alt="Default" />
                  </Grid>
                  <Grid item>
                    <img className={classes.img} src={defaultBackground2} onClick={()=>setBackground(defaultBackground2)} alt="Default" />
                  </Grid>                  
                </Grid>
              </Grid>
              
              <Grid container item spacing={3}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">
                <Grid item>
                  <MuiThemeProvider theme={resFont}><Typography>Change Text Background</Typography></MuiThemeProvider>
                </Grid>

                <Grid container item direction="row" spacing={1}>                
                  <Grid item>
                    <img className={classes.img} src={defaultTextBackground1} onClick={()=>setFormalTextBackground(defaultTextBackground1)} alt="Default" height={100} width={100} />
                  </Grid>  
                  <Grid item>
                    <img className={classes.img} src={defaultTextBackground2} onClick={()=>setFormalTextBackground(defaultTextBackground2)} alt="Default" height={100} width={100} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>):null
          }

          {value === 2?
            (<Grid container 
              spacing={5}
              direction="column"
              justify="center"
              alignItems="baseline"> 
              <Grid item>
                <MuiThemeProvider theme={resFont}><Typography>Page: {leisure_page_tag}</Typography></MuiThemeProvider>
              </Grid>
              
              <Grid container item spacing={3}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">
              <Grid item>
                  <MuiThemeProvider theme={resFont}><Typography>Change Background</Typography></MuiThemeProvider>
              </Grid>
              <Grid container item direction="row" spacing={1} >                
                <Grid item>
                  <img className={classes.img}  src={defaultBackground1} onClick={()=>setBackground(defaultBackground1)} alt="Default" />
                </Grid>
                <Grid item>
                  <img className={classes.img} src={defaultBackground2} onClick={()=>setBackground(defaultBackground2)} alt="Default"  />
                </Grid>                
              </Grid>   
              </Grid>              
              
              <Grid container item spacing={3}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">
                <Grid item>
                  <MuiThemeProvider theme={resFont}><Typography>Change Text Background</Typography></MuiThemeProvider>
                </Grid>
                <Grid container item direction="row" spacing={1}>                  
                  <Grid item>
                    <img className={classes.img} src={defaultTextBackground1} onClick={()=>setLeisureTextBackground(defaultTextBackground1)} alt="Default" height={100} width={100} />
                  </Grid>  
                  <Grid item>
                    <img className={classes.img} src={defaultTextBackground2} onClick={()=>setLeisureTextBackground(defaultTextBackground2)} alt="Default" height={100} width={100} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>):null
          }
          {value === 3?
            (<Grid container 
              spacing={5}
              direction="column"
              justify="center"
              alignItems="baseline"> 
              <Grid item>
                <MuiThemeProvider theme={resFont}><Typography>Page: {contact_page_tag}</Typography></MuiThemeProvider>
              </Grid> 

              <Grid container item spacing={3}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">
                <Grid item>
                  <MuiThemeProvider theme={resFont}><Typography>Change Background</Typography></MuiThemeProvider>
                </Grid>
                <Grid container item direction="row" spacing={1} >
                  <Grid item>
                    <img className={classes.img} src={defaultBackground1} onClick={()=>setBackground(defaultBackground1)} alt="Default" />
                  </Grid>
                  <Grid item>
                    <img className={classes.img} src={defaultBackground2} onClick={()=>setBackground(defaultBackground2)} alt="Default" />
                  </Grid>
                </Grid>
              </Grid> 

              <Grid container item spacing={3}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">                
                <Grid item>
                  <MuiThemeProvider theme={resFont}><Typography>Change Text Background</Typography></MuiThemeProvider>
                </Grid>
                <Grid container item direction="row" spacing={1} >
                  <Grid item>
                    <img className={classes.img} src={defaultTextBackground1} onClick={()=>setContactTextBackground(defaultTextBackground1)} alt="Default" height={100} width={100} />
                  </Grid>  
                  <Grid item>
                    <img className={classes.img} src={defaultTextBackground2} onClick={()=>setContactTextBackground(defaultTextBackground2)} alt="Default" height={100} width={100} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>):null
          }
        </Grid>
       
        <Grid className={classes.editor}
              container
              justify="center"
              alignItems="center">
          <Paper className={classes.paper}>
            
            <Grid container 
                  spacing={2}
                  direction="column"
                  justify="center"
                  alignItems="center">

               {/* Header editor */}
              <Grid item container
                    justify="center"
                    alignItems="center">
                  <Grid container
                        spacing={0}
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <Grid item container
                              justify="center"
                              alignItems="center">
                          <InputBase className={classes.username_input}
                                  classes={{input: classes.inputCenter}}
                                  placeholder="Your Name"
                                  defaultValue={user_name_value} 
                                  inputProps={{style: {fontSize: 40}}}
                                  onChange={event=> setUserName(event.target.value)}/>
                        </Grid>

                    <Grid item container
                          justify="center"
                          alignItems="center">
                        <Grid container item 
                              alignItems="center"
                              direction="row"
                              justify="center"
                              className={classes.header}>
                          <ClickAwayListener onClickAway={handleClickAwayHeader}>
                          {open_edit_header?              
                            (
                             <Grid container
                              alignItems="center"
                              direction="row"
                              justify="center">
                               <PortfolioHeaderEditor
                                          homePageTab={home_page_tag} changeHomePageTab={changeHomePageTab}
                                          formalPageTab={formal_page_tag} changeFormalPageTab={changeFormalPageTab}
                                          leisurePageTab={leisure_page_tag} changeLeisurePageTab={changeLeisurePageTab}
                                          contactPageTab={contact_page_tag} changeContactPageTab={changeContactPageTab}/>
                             </Grid>
                            ):
                            (
                              <Grid container
                                    alignItems="center"
                                    direction="row"
                                    justify="center">
                              <Tabs
                                value={value}
                                onChange={handleTabsChange}
                                tabItemContainerStyle={{width: '20px'}}
                                indicatorColor={"white"}                                
                                variant="scrollable"
                                scrollButtons="auto"
                              >
                                <Tab label={<span className={classes.tabs_font}>{home_page_tag}</span>} {...a11yProps(0)} />
                                <Tab label={<span className={classes.tabs_font}>{formal_page_tag}</span>}{...a11yProps(1)} />
                                <Tab label={<span className={classes.tabs_font}>{leisure_page_tag}</span>} {...a11yProps(2)} />
                                <Tab label={<span className={classes.tabs_font}>{contact_page_tag}</span>} {...a11yProps(3)} />
                              </Tabs>
                              <Grid item>
                                <Icon className={classes.icon} onClick={handleOpenHeaderEditor}>edit</Icon>
                              </Grid>
                            </Grid>                              
                            )              
                          }   
                          </ClickAwayListener>
                        </Grid>
                    </Grid>    
                  </Grid>                  
              </Grid>
              
              <Grid className={classes.portfolio_content}
                    container item
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ backgroundImage:`url(${background_image})`, 
                        backgroundRepeat: "no-repeat", 
                        backgroungSize: "cover"}}>

                {/* Home page editor */}
                <TabPanel value={value} index={0}>              
                  <form noValidate autoComplete="off" className={classes.editor_form}>
                    <Grid container
                          spacing={3}
                          direction="column"
                          justify="center"
                          alignItems="center"
                    >
                      <Grid item>
                        <UploadPicture uploadPicture={setProfilePhoto} 
                                      circular="true"
                                      pictureUrl={profile_photo_value}
                                      onChange={compareEdge()}
                                      width={smalleredge*0.5}
                                      height={smalleredge*0.5}/>
                      </Grid>

                      <Grid item>
                        <InputBase
                          multiline
                          fullWidth
                          classes={{input: classes.inputCenter}}
                          className={classes.introduction_input} 
                          variant='outlined'
                          id="introduction"
                          name="introduction"
                          label="introduction"                          
                          inputProps={{style: {fontSize: 25}}}
                          defaultValue={introduction_value}
                          onChange={event => setIntroduction(event.target.value)}
                        />
                      </Grid>       
                    </Grid>
                  </form>                 
                </TabPanel>
                
                {/* About page editor */}
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <form noValidate autoComplete="off" className={classes.editor_form}>
                    <Grid container
                          spacing={4}
                          direction="column"
                          justify="center"
                          alignItems="center">
                      <Grid container item 
                            justify="center"
                            alignItems="center">
                        <InputBase className={classes.formal_title_input} 
                                  classes={{input: classes.inputCenter}}
                                  name="formal_page_title"
                                  placeholder="About Me" 
                                  defaultValue={formal_page_title} 
                                  inputProps={{style: {fontSize: 30}}}  
                                  onChange={event=> setFormalPageTitle(event.target.value)}/>
                      </Grid>

                      <Grid item>
                        <SectionsEditor sections={formal_page_sections}
                                          sectionBackground={formal_text_background} 
                                          onChange={setFormalPageSections}
                                          photoHeight={size.width*0.3*(5/6)}
                                          photoWidth={size.width*0.3}/>
                      </Grid>

                    </Grid>
                  </form>
                </TabPanel>

                {/* Leisure page editor */}
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <form noValidate autoComplete="off" className={classes.field_root}>
                    <Grid container
                          className={classes.editor_form}
                          spacing={4}
                          direction="column"
                          justify="center"
                          alignItems="center">
                      <Grid container item 
                            justify="center"
                            alignItems="center">
                      
                        <InputBase className={classes.leisure_title_input} 
                                      classes={{input: classes.inputCenter}}
                                      name="contact_page_title"
                                      placeholder="Free Time" 
                                      defaultValue={leisure_page_title} 
                                      inputProps={{style: {fontSize: 35}}}  
                                      onChange={event => setLeisurePageTitle(event.target.value)}/>
                      </Grid>

                      <Grid item container
                            justify="center"
                            alignItems="center">
                        <SectionsEditor sections={leisure_page_sections} 
                                          sectionBackground={leisure_text_background} 
                                          onChange={setLeisurePageSections}
                                           photoHeight={size.width*0.3*(5/6)}
                                           photoWidth={size.width*0.3}/>
                      </Grid>

                    </Grid>
                  </form>
                </TabPanel>

                {/* Contact page editor */}
                <TabPanel value={value} index={3} dir={theme.direction}>
                
                    <form noValidate autoComplete="off" className={classes.field_root}>
                      
                    <Grid container
                          className={classes.editor_form}
                          direction="column"
                          justify="center"
                          alignItems="center">

                      <Grid container item className={classes.contact_content}
                          justify="center"
                          alignItems="center"
                          style={{ backgroundImage:`url(${contact_text_background})`}}>                        

                        <Grid item>
                          <UploadPicture uploadPicture={setContactPhoto} 
                                        pictureUrl={contact_page_photo}
                                        width={size.width * 0.28}
                                        height={size.width * 0.28}/>
                        </Grid>
                        
                        <Grid container item
                            className={classes.contact_input}
                            spacing={2}
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                            >

                          <Grid item>
                            <InputBase className={classes.contact_title_input}                                       
                                      name="contact_page_title"
                                      placeholder="Contact Me" 
                                      defaultValue={contact_page_title} 
                                      inputProps={{style: {fontSize: 35}}}  
                                      onChange={event=> setContactPageTitle(event.target.value)}/>
                          </Grid>

                          <Grid item>
                            <TextField fullWidth className={classes.contact_detail}     
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="email" 
                            defaultValue={email_value}
                            inputProps={{style: {fontSize: 20}}}
                            onChange={event => setEmail(event.target.value)}
                            />
                          </Grid>

                          <Grid item>
                          <TextField fullWidth className={classes.contact_detail}     
                            id="phone"
                            name="phone"
                            label="Phone"
                            placeholder="Phone" 
                            defaultValue={phone_value}
                            inputProps={{style: {fontSize: 20}}}
                            onChange={event => setPhone(event.target.value)}
                          />
                          </Grid>
                        </Grid>
                      </Grid>
                   
                    </Grid>
                  </form>            
                </TabPanel>
               
              </Grid>         
            </Grid>
        
          </Paper>
        </Grid>
      </div>
    </Grid>
  </div>

  );
}
