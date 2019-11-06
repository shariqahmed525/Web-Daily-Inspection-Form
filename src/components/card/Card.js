import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    margin: 10,
    width: 250,
    padding: 10,
    height: 250,
    display: "flex",
    cursor: "pointer",
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: "rgba(0,0,0,0.2) 5px 5px 5px",
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }
}));

const AppCard = props => {
  const classes = useStyles();
  const { value, name, onClick } = props;
  return (
    <Card className={classes.card} onClick={onClick}>
      <div className={classes.cardContent}>
        <Typography
          variant="h2"
          color="secondary"
          className={classes.title}
        >
        </Typography>
        <Typography
          variant="h2"
          color="secondary"
          className={classes.title}
        >
          {value}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.subtitle}
        >
          {name}
        </Typography>
      </div>
    </Card>
  )
}

export default AppCard;
