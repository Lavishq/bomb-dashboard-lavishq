import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useBombStats from '../../hooks/useBombStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
// import { Bomb as bombTesting } from '../../bomb-finance/deployments/deployments.testing.json';
//import { Bomb as bombProd } from '../../bomb-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import { Alert } from '@material-ui/lab';
import { IoCloseOutline } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';
import { makeStyles } from '@material-ui/core/styles';
import useBombFinance from '../../hooks/useBombFinance';
import { ReactComponent as IconDiscord } from '../../assets/img/discord.svg';
//import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { Helmet } from 'react-helmet';
import BombImage from '../../assets/img/bomb.png';

//import useBombMaxiStats from '../../hooks/useBombMaxiStats';

import HomeImage from '../../assets/img/background.jpg';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb.money | BTC pegged algocoin';

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const bombFtmLpStats = useLpStatsBTC('BOMB-BTCB-LP');
  const bShareFtmLpStats = useLpStats('BSHARE-BNB-LP');
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();
  // const bombmaxi = useBombMaxiStats('0xd6f52e8ab206e59a1e13b3d6c5b7f31e90ef46ef000200000000000000000028');

  // console.log(bombmaxi);
  // let bomb;
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   bomb = bombTesting;
  // } else {
  //   bomb = bombProd;
  // }

  const buyBombAddress = //'https://app.1inch.io/#/56/swap/BTCB/BOMB';
    //  'https://pancakeswap.finance/swap?inputCurrency=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&outputCurrency=' +
    'https://app.bogged.finance/bsc/swap?tokenIn=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&tokenOut=0x522348779DCb2911539e76A1042aA922F9C47Ee3';
  //https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyBShareAddress = //'https://app.1inch.io/#/56/swap/BNB/BSHARE';
    'https://app.bogged.finance/bsc/swap?tokenIn=BNB&tokenOut=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyBusmAddress =
    'https://app.bogged.finance/bsc/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0x6216B17f696B14701E17BCB24Ec14430261Be94A';
  const bombLPStats = useMemo(() => (bombFtmLpStats ? bombFtmLpStats : null), [bombFtmLpStats]);
  const bshareLPStats = useMemo(() => (bShareFtmLpStats ? bShareFtmLpStats : null), [bShareFtmLpStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const bombLpZap = useZap({ depositTokenName: 'BOMB-BTCB-LP' });
  const bshareLpZap = useZap({ depositTokenName: 'BSHARE-BNB-LP' });

  const [onPresentBombZap, onDissmissBombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBombZap();
      }}
      tokenName={'BOMB-BTCB-LP'}
    />,
  );

  const [onPresentBshareZap, onDissmissBshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBshareZap();
      }}
      tokenName={'BSHARE-BNB-LP'}
    />,
  );

  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  // const [onPresentIntroVid] = useModal(
  //   <grid>
  //     <Paper>
  //       <div>
  //         <iframe
  //           width="560"
  //           height="315"
  //           src="https://www.youtube.com/embed/nhCWmmRNNhc"
  //           title="YouTube video player"
  //           frameborder="0"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowfullscreen
  //         ></iframe>
  //       </div>
  //     </Paper>
  //   </grid>,
  // );

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      {/* <Grid item xs={12} sm={8}> */}

      {/* Bomb Finance Summary */}
      {/* <Grid xs={12} sm={8}> */}
      <Paper>
        <Box p={2} style={{ textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: "22px" }}>Bomb Finance Summary</h1>
          <hr />
        </Box>
        <Grid style={{ margin: '12px', display: 'flex' }}>
          {/* <Grid item xs={12} sm={6}> */}
          <Grid>
            <Card>
              <CardContent align="center">
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 3,
                    rowGap: 1,
                    gridTemplateColumns: 'repeat(5, 1fr)',
                  }}
                >
                  <Box></Box>
                  <Box>Current Supply</Box>
                  <Box>Total Supply</Box>
                  <Box>Price</Box>
                  <Box></Box>

                  <TokenSymbol size={32} symbol="BOMB" />
                  <Box>$BOMB</Box>
                  <Box>M</Box>
                  <Box>K</Box>
                  <Box>                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} /></Box>
                  <TokenSymbol size={32} symbol="BSHARE" />
                  <Box>$BSHARE</Box>
                  <Box>M</Box>
                  <Box>K</Box>
                  <Box><img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} /></Box>

                  <TokenSymbol size={32} symbol="BBOND" /> <Box>$BBOND</Box>
                  <Box>M</Box>
                  <Box>K</Box>
                  <Box><img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} /></Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* </Grid> */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent align="center">
                <h2>current Epoch</h2><>0</>
                <hr />
                <>00:00:00</>
                Next Epoch in
                <hr />
                <>Live TWAP:<>000</></>
                <>TVL:<>000</></>
                <>Last Epoch TWAP:<>000</></>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      {/* </Grid> */}

      {/* BoardRoom section */}
      <Grid style={{ margin: '12px', color: "#9EE6FF" }} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box style={{ textAlign: "right", textDecoration: "underline" }}>Read Investment Strategy &gt;</Box>
          <Box>

            <Button
              style={{ textDecoration: "none", fontWeight: "bolder", margin: '10px', width: "100%", backgroundColor: "#00ADE8" }}
            >INVEST NOW
            </Button>
          </Box>
          <Box>

            <Button
              style={{ textDecoration: "None", fontWeight: "bolder", margin: '10px', maxWidth: "100%", backgroundColor: "#00ADE8" }}
            >
              <a href="http://discord.bomb.money/" rel="noopener noreferrer" target="_blank" className={classes.link}>
                <IconDiscord style={{ fill: '#728CDF', height: '20px' }} />
              </a>Chat on Discord
            </Button>
            <Button
              style={{ textDecoration: "none", fontWeight: "bolder", margin: '10px', maxWidth: "100%", backgroundColor: "#00ADE8" }}
            >
              Read Docs
            </Button>
            <hr />
          </Box>
          <Paper>
            <TokenSymbol symbol="BSHARE" />
            Boardroom
            <button
              style={{ fontSize: "12px", textDecoration: "none", borderRadius: "5px", backgroundColor: "#00E8A2", size: "small" }}
            >
              Recommended
            </button>
            <Box style={{ textAlign: "left" }}>
              Stake BSHARE and earn BOMB every epoch

              <Box style={{ textAlign: "right" }}>TVL: $00000</Box>
              <hr />
              <Box style={{ textAlign: "right" }}>Total Staked<TokenSymbol size={16} symbol="BSHARE" />0000</Box>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card className={classes.gridItem}>
                    <CardContent style={{ textAlign: 'center' }}>
                      <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Next Epoch</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Current Epoch</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>
                        BOMB PEG <small>(TWAP)</small>
                      </Typography>
                      <Typography>
                        <small>per 10,000 BOMB</small>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card >
                    <Box>
                      <Button
                        style={{ textDecoration: "None", maxWidth: "100%", border: " 1px solid #fff" }}
                      >
                        Deposit
                      </Button>
                      <Button
                        style={{ textDecoration: "none", maxWidth: "100%", border: " 1px solid #fff" }}
                      >
                        Withdraw
                      </Button>

                    </Box>
                    <Button
                      style={{ textDecoration: "None", maxWidth: "100%", border: " 1px solid #fff" }}
                    >
                      Claim rewards
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} >
          <Paper>
            Latest News
          </Paper>
        </Grid>
      </Grid>
      {/* </Grid> */}
      {/* Bond Farms */}
      <Box p={2} style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: "22px" }}>Bomb Finance Summary</h1>
        <hr />
      </Box>
      {/* Bonds */}
      <Box p={2} style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: "22px" }}>Bomb Finance Summary</h1>
        <hr />
      </Box>


    </Page>
  );
};

export default Dashboard;
