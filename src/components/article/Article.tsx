'use client';

import classNames from "classnames";
import Image from "next/image";
import styles from './article.module.scss'
import Link from "next/link";
import {useContext} from "react";
import {LoginContext} from "@/app/login";
import Markdown from "react-markdown";


export default function Article() {
  const loginContext = useContext(LoginContext);
  const article = {
    title: "Introduction to Subfluid Protocol",
    author: {
      avatar: "/article/avatar.png",
      username: "ribmaster",
      vault_address: '0x828E57850A43692B627d1804D8BbA38736bF2683',
      created_at: new Date().toLocaleDateString()
    },
    content: `Subfluid is a crypto-native subscription protocol implemented with account abstraction and the Aave ecosystem.  
# Why do we need a subscription in crypto

Let's consider the traditional internet economy, particularly the realm of content creators. Subscription models have proven incredibly lucrative here. For instance, the top ten creators on Substack, a leading platform in the creator economy, collectively earn over $20 million per year, all thanks to subscription-based support. This staggering figure underscores the viability and importance of subscription models in fostering a sustainable and profitable ecosystem for content creators.

In the crypto field, there are also many outstanding creators active, and the introduction of crypto subscription mechanisms can enable them to better connect with corresponding users and readers. 

# What is the challenge in this field

The main reason is that traditional EOA (Externally Owned Accounts) are not compatible with complex subscription and payment methods, and the mechanism of over-collateralization in on-chain lending protocols can't replicate the credit card's account payment system. For example, if a user wants to set up a subscription transfer mechanism, it's not feasible with traditional EOA accounts. Once we introduce lending protocols to address credit issues, like using collateralized positions as a credit base, it still requires users to engage in complex on-chain interactions. For instance, users need to approve tokens for collateralization, and then use the borrowed assets as payment currency, which involves wallet transactions. Traditional EOA accounts and subscriptions are not well-suited for the creator economy in the cryptocurrency domain.

# How does Subfluid solve these challenges

Despite significant success in the traditional internet economy, the crypto world has been slow to adopt subscription-based payment solutions using cryptocurrency. This is where Subfluid comes in, filling a crucial gap in the market. Subfluid utilizes the unique features of the crypto space to fundamentally change the management and processing of subscriptions, offering a new way for creators in the crypto domain to monetize their work sustainably.

**Project Overview**

The system allows subscription service providers to continuously receive cryptocurrency payments while incentivizing users with cashback to continue participating. Users pay for subscriptions using USDT through the AA wallet, which is automatically deposited into the Aave lending platform. Monthly, GHO stablecoins are issued as subscription fees based on the collateralized assets. The cashback mechanism encourages users to keep their assets collateralized, ensuring the fund pool remains operational and profitable.
![subfluid architecture](/article/subfluid-architecture.png)
The cashback mechanism in this model is realized through the direct rate fluctuations between Aave GHO and other stablecoins. For instance, when the lending rate of GHO is lower than the interest rate for collateralized USDT, it is considered a positive return, and the lending is maintained. Conversely, the same principle applies when the rates are reversed.`
  }

  return (
      <div className={classNames("max-w-[780px] mx-auto pt-[32px]")}>
        <h2 className={styles.title}>{article.title}</h2>

        <div className={classNames("flex flex-row", styles['card'])}>
          <Image className="rounded-[50%]" src={article.author.avatar} alt={"User Avatar"}
                 width={44} height={44}/>
          <div className="ml-[21px] flex flex-col justify-evenly">
            <p className={styles.username}>{article.author.username} <a className={styles.vault} target="_blank" href={`https://sepolia.etherscan.io/address/${article.author.vault_address}`}>({article.author.vault_address.slice(0, 15)}...{article.author.vault_address.slice(-3)})</a></p>
            <p className={styles['created-time']}>{article.author.created_at}</p>
          </div>
        </div>

        <div className={classNames("flex flex-row", styles['card'])}>

          <button className="flex flex-row">
            <Image src={"/icon/like.svg"} alt={"Like"} width={24} height={24}/>
            <span className="ml-[8px]">14</span>
          </button>
          <button className="flex flex-row ml-[40px]">
            <Image src={"/icon/comment.svg"} alt={"Comment"} width={24} height={24}/>
            <span className="ml-[8px]">7</span>
          </button>
        </div>

        <div className={styles.markdown}>
          <Markdown>{article.content}</Markdown>
        </div>

        <div>
          <button
              className="w-full h-[44px] bg-[#262626] text-[#FFFFFF] rounded-[6px] mt-[32px] mb-[90px]"
              onClick={() => {
                loginContext.login();
              }}
          >
            Subscribe to continue reading
          </button>
        </div>

        <div
            className={classNames("flex flex-row justify-between py-[16px] border-t-[1px] border-t-[#D6D6D6]", styles.footer)}>
          <Link href="/">
            <Image src={"/article-logo.svg"} alt={"Article Logo"} width={92} height={25}/>
          </Link>

          <span className="text-[14px] opacity-30">Powered by Aave</span>
        </div>
      </div>
  )
}