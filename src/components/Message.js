import React, { useRef, useEffect, forwardRef } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import "moment-timezone";
import { Avatar, Card, CardContent, Typography } from "@material-ui/core";

import "../Message.css";
const StyledCard = styled(Card)``;
const StyledMoment = styled(Moment)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.3rem 0.5rem 0.3rem 0.3rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
`;
const StyledCardContent = styled(CardContent)`
  padding: 0.3rem 0.3rem 1rem 0.3rem !important;
`;
const StyledTypography = styled(Typography)`
  max-width: 60vw;
  min-width: 5.5rem;
`;

const StyledContainer = styled.div`
  display: inline-block;
  position: relative;
`;
const StyledAvtar = styled(Avatar)``;

const Message = forwardRef(({ userName, message, time }, ref) => {
  const isUser = userName === message.username;

  

  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      <StyledContainer>
        <StyledCard
          className={isUser ? "message_user_card" : "message_guest_card"}
        >
          <StyledCardContent>
            <StyledTypography
              className={
                isUser ? "typography_user_card" : "typography_guest_card"
              }
              color="textSecondary"
              variant="h5"
              component="h2"
            >
              {message.message}
            </StyledTypography>
          </StyledCardContent>
          <StyledMoment format="DD/MM/YYYY ,hh:mm">
            {time?.toDate()}
          </StyledMoment>
        </StyledCard>
        <StyledAvtar alt={message.username} src="/static/images/avatar/1.jpg" />
      </StyledContainer>
    </div>
  );
});

export default Message;
