# 🏆 Bidding System -- High Level Design (HLD)

## 📌 Overview

This project is a real-time online bidding (auction) system where users
can create auctions and place bids instantly using WebSockets. The
system uses MySQL as the primary data store and ensures consistency
through database-level concurrency control.

## 🎯 Objectives

-   Enable real-time bidding using WebSockets\
-   Maintain highest bid consistently\
-   Handle concurrent bids safely using MySQL\
-   Provide low-latency updates to all connected users

## 🏗️ High Level Architecture

        ┌──────────────┐
        │   Frontend   │  (React / Web App)
        └──────┬───────┘
               │ WebSocket Connection
        ┌──────▼────────┐
        │ WebSocket API │
        │   Gateway     │
        └──────┬────────┘
               │

┌───────────▼───────────┐ │ Backend Services │ │ - Auth Service │ │ -
Auction Service │ │ - Bidding Service │ └───────────┬───────────┘ │
┌──────▼──────┐ │ MySQL DB │ └─────────────┘

## 🔄 Data Flow

1.  Client connects via WebSocket\
2.  User places a bid\
3.  Server validates bid\
4.  MySQL updates current price\
5.  Server broadcasts update to all clients

## ⚡ Concurrency Handling

### Row-Level Locking

SELECT \* FROM auctions WHERE id = ? FOR UPDATE;

### Conditional Update

UPDATE auctions SET current_price = ? WHERE id = ? AND current_price \<
?;

## 🚀 Conclusion

This system uses WebSockets for real-time communication and MySQL for
strong consistency, making it simple yet effective for small to
medium-scale bidding platforms.
