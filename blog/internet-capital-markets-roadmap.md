# Internet Capital Markets: The Road Ahead

![Internet Capital Markets Hero](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/icm_hero_image.png)
*An illustrative image of decentralized internet capital markets with globally connected network nodes*

Welcome to an exciting journey exploring the world of Internet Capital Markets (ICM)! In this article, we will delve into the core concepts, current challenges, and the promising future of this field, especially on the Solana platform. Get ready to transform complex ideas into easily understandable and engaging knowledge!

## What is ICM and Why is it Important?

Internet Capital Markets (ICM) is a concept reshaping our understanding of finance and trading. Instead of traditional centralized exchanges, ICM aims to build a more decentralized, transparent, and efficient financial system where everyone can participate without geographical limitations or traditional barriers.

Solana, a high-performance blockchain, is leading the way in realizing this vision. Solana's initial goal was to build a decentralized backbone for ICM. This requires high bandwidth and low latency, which are necessary but not sufficient to address the complexities of market microstructure.

## ACE: The Key to ICM's Future

Currently, the ecosystem is converging around a shared vision: **Application-Controlled Execution (ACE)**. The ultimate objective of ACE is to give smart contracts millisecond-level control over their own transaction ordering. In conversations with teams across the ecosystem, market microstructure is the single most important problem in Solana today.

To build the most liquid markets on-chain, we need three key elements:

1.  **Chain Capacity:** The chain must have more than enough capacity to ingest all market-relevant information in real-time at line rate.
2.  **Fast Confirmations and Tick Rate:** The chain must have fast confirmations and an even faster tick rate (slot time).
3.  **Execution Ordering Control:** The chain must allow applications to control their own execution ordering to facilitate experiments with new market microstructures.

## The Single Leader Problem and MCL Solution

In any single-leader blockchain (almost all modern chains are single-leader), a single leader controls access and ordering of transactions during their leader window. This means that if the chain wants to give applications control over their own transaction execution, it must have the cooperation of friendly leaders. In a global permissionless system, you cannot count on friendly leaders to play nice with billion-dollar financial applications.

**Multiple Concurrent Leaders (MCL)** is a solution to the Single Leader Problem: the chain can control ordering by enforcing reordering at the replay stage, but this doesn't prevent validators from selectively including certain transactions and censoring others to manipulate the final ordering for their own gain.

To solve the selective censorship problem, the number of leaders who can add transactions to the chain during any given leader window must be increased. If one leader censors a transaction, another may include it, making it difficult for any one leader to control the final execution outcome.

Once transactions have been sorted intra-block in priority order, applications automatically have a lot of leeway to control their own sequencing by reading the priority fee and executing conditional logic based on that. It's simple to implement cancel prioritization with this setup. In general, it's also possible to run arbitrary auctions if app developers get creative.

## Interactive: Understanding the Single Leader Problem

To better understand the problem Solana is solving, see the illustration below:

![Single Leader Problem](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/single_leader_problem.png)
*Comparison between Single Leader (left) and Multiple Concurrent Leaders (right)*

As you can see, in the Single Leader model, all transactions must pass through a single point, creating a bottleneck. In contrast, MCL allows multiple leaders to process transactions in parallel, increasing performance and reducing censorship risk.

## Global Information Synchronization

Multiple concurrent leaders allow Solana to ingest information from around the world at the same time—faster than co-located infrastructure. And, because smart contracts are general-purpose languages, market makers can now combine real-time information generated in New York and Tokyo in their quoting strategies by reading both information streams into the same smart contract.

![MCL Architecture](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/mcl_architecture.png)
*MCL Architecture enables synchronization of information from New York and Tokyo simultaneously*

This is a feature of multiple proposer blockchains that cannot be replicated by a single server anywhere in the world. In other words, Solana will offer tools for internet capital markets that are unique to decentralized blockchains and cannot be replicated by centralized competitors.

## Trade-offs in Market Microstructure

There are many aspects of market microstructure, and balancing them is crucial for creating an efficient and fair market. Here are some common trade-offs applications are considering in the industry:

### Privacy vs. Transparency

A question people ask on both sides of the market is: should orders be hidden before execution? For large retail orders, broadcasting your transaction can improve execution as it reduces information asymmetry between you and market makers. Conversely, hidden liquidity can lead to less liquid markets because hiding orders protects market makers from adverse selection due to toxicity.

### Speed vs. Unrestricted Trading

Speedbumps protect takers from adverse selection, leading to tighter spreads and more liquid markets; however, speedbumps also reduce volume (as there are fewer toxic trades) and slow price discovery (as informed trades happen faster on non-speedbumped venues). But volume is a vanity metric. What users really care about is liquidity; that is, where users trade to get the best price. Some volume is good for creating more efficient markets, other volume—especially toxic taker volume—makes markets less liquid. When market makers consistently lose money to toxic takers, they compensate by quoting worse prices to users. If you make changes that reduce toxic taker volume, you might reduce overall volume but increase liquidity on the exchange.

Solana should host the world's most liquid markets, not the highest volume markets.

### Inclusion vs. Finality vs. Execution Latency

While the referenced tweet presents this design decision as a trade-off, it is not in fact. Inclusion time primarily relates to the transaction lifecycle before the transaction hits the chain and slot time (currently 400ms); finality primarily relates to the consensus algorithm.

While faster finality is important because it reduces the need for market makers to account for complex branching logic, shorter inclusion time is more important for liquidity because it determines how quickly market makers can update their quotes. As inclusion time decreases, market makers are less exposed to "gap risk," where prices move off-chain and they are unable to cancel old quotes before they are picked off by takers.

Solana today offers optimistic finality on the order of ~1s. After Alpenglow (more on that below), which is expected to hit Solana mainnet in early 2026, inclusion time is expected to drop to 50-100 ms, and finality to ~150 ms.

### Co-location vs. Geographic Decentralization

On the surface, many believe co-location is faster, but it doesn’t necessarily get all of the world’s information on-chain as fast as possible. As a thought experiment, suppose all of the validators for a chain are located in New York. Then the Japanese government suddenly announces a loosening of trade restrictions on American cars. The geographic distance between the news event and the validator slows down information about the market’s reaction by over a hundred milliseconds before it reaches American validators. With geographic decentralization and multiple concurrent leaders (MCL), information from around the world can be ingested into the system in the same 20ms execution.

By decentralizing transaction inclusion via MCL and pushing transaction inclusion to the edge, Solana can further reduce the time for information to impact price discovery, regardless of the information’s origin.

Co-located systems also create extreme information asymmetry, making them parochial. Centralized trading makes extensive use of inter-exchange arbitrage, which may look like a global market, but in fact, each co-located system acts as a regional market based on time.

Geographic decentralization has other advantages besides synchronizing the world’s information as fast as possible. It makes the network more resilient to natural disasters and local power outages. It also makes the network harder to break by hostile entities, and, in general, reduces round-trip time for users who can send transactions to leaders near them instead of having to send transactions to leaders on the other side of the world.

### Maker vs. First Taker

Spreads are determined by the zero-profit condition balancing two competing forces: revenue from uninformed traders and costs from being picked off by informed traders. On other markets, maker prioritization creates a healthier market with tighter spreads while taker prioritization increases adverse selection (widening spreads).

In fact, in Solana today, the system does not explicitly prioritize one side; as a result, takers have effective prioritization on Solana because of periodic auctions in the scheduler. Other decentralized layer 1 networks are even worse because their auction times are even longer.

In the solutions section, we will discuss in detail how ACE can enable individual applications to define custom rules related to maker vs. taker (e.g., speedbumps, executing cancels before taker orders, etc.).

### Retail vs. Institutional

Exchanges should try to attract as many uninformed traders as possible because they create the tightest spreads. To the extent that retail and institutional require different architectures, Solana’s hope is that different applications will be built to serve the needs of each, and both will thrive on Solana mainnet.

### Flexible vs. Opinionated

There are no zealots at Solana, only pragmatic engineers who want to build a platform that can support the world’s most liquid financial markets. If the community believed that a particular market structure was better than all the rest, the community would advocate for building that into the protocol—but they don’t.

The only way to know which market structure is best at a particular time is to test them in production, gather data, iterate, and iterate. Solana is building a flexible platform to facilitate ACE because we believe that is the fastest path to converging on the best possible market structure.

Solana applications will run many concurrent experiments testing all of the above trade-offs. That will lead to the best long-term equilibrium in market microstructure as fast as possible.

### Hybrid vs. Fully On-Chain

Solana is building for 100% on-chain markets—not a settlement layer for a centralized, off-chain exchange. There is no technical impossibility or open problem that will prevent the community from getting there. All that’s left is to build.

Solana’s priority is to get as much liquidity on mainnet as possible.

## ICM Roadmap: Short-term, Mid-term, and Long-term

![Roadmap Timeline](https://raw.githubusercontent.com/Vietduc88x/techmadeeasy-website/main/blog/roadmap_timeline.png)
*ICM Development Roadmap from Short-term to Long-term*

Solana mainnet today is not an ideal environment for Central Limit Order Books (CLOBs) for many reasons—but it soon will be. Teams across the ecosystem have been working to make CLOBs thrive on mainnet, and several key developments are coming as early as next month, with more improvements to follow in the mid-term and long-term.

Below we will outline the short-term, mid-term, and long-term developments that ensure CLOBs thrive on Solana, and ultimately enable trading programs to compete with their centralized counterparts.

### Short-term (1-3 months): Jito’s Block Assembly Marketplace (BAM) and Anza’s Transaction Landing Improvements

In this section, we define short-term as the next 1-3 months—e.g., projects that have been in the works for a while and are about to hit mainnet.

#### Jito’s Block Assembly Marketplace (BAM)

Jito’s Block Assembly Marketplace (BAM) is a next-generation high-performance transaction processing system, providing Solana validators, traders, and applications with powerful new tools to improve performance and create value.

Jito Labs began working on the Block Assembly Marketplace (BAM) in late 2024 because they recognized the need for in-slot transaction determinism. BAM is hitting testnet in the next few days.

In the near term, BAM provides something close to full ACE. Design partners—including Drift and Dflow—are building BAM plugins right now.

BAM operates via a globally distributed decentralized network of operators running the BAM software stack inside Trusted Execution Environments (TEEs). Validators simply connect to BAM nodes via the new Jito-Solana client; no complex integration is required. BAM’s TEEs create a unique privacy that keeps transactions secret until execution while enabling fully transparent, verifiable serialization via open source code and TEE attestation. BAM creates cryptographic proofs of every operation, yielding the most transparent transaction processing system available.

Via plugins, BAM includes a system that allows application developers to define in-slot transaction serialization rules. This effectively acts as ACE, but runs within BAM rather than directly on Solana mainnet.

BAM turns the Solana blockspace into an open sandbox where developers can build modular programs that add functionality to transaction processing. For the first time, applications can implement custom serialization rules, enabling Central Limit Order Books (CLOBs) to compete with traditional exchanges. CLOB plugins can run inside BAM and rely on a combination of off-chain and on-chain logic, enabling full transparency and deterministic execution. Unlike traditional approaches that require validator forking to add custom functionality and negotiating BD deals with every validator, developers simply build their CLOB logic inside BAM via a plugin and immediately tap into Solana’s global on-chain network effects—to the entire ecosystem from day one while ensuring every transaction is cryptographically verifiable and transparently serialized.

Validators earn more via better block building. Users get faster, cheaper, and more reliable trades. Professional traders gain unprecedented trust in Solana’s infrastructure because BAM’s open-source and verifiable nature will ensure fairness with no gaming or backroom deals. Everyone benefits as network effects increase, driving a virtuous cycle of innovation and value creation.

BAM is rolling out in late July. You should expect significant improvements in trading as BAM rolls out. BAM will help Solana mainnet applications feel closer to CEX.

#### Anza’s Transaction Landing Improvements

Concurrent with BAM, Anza is working to improve transaction landing reliability with the goal of making transactions land in the same slot reliably. Agave 2.3, which is recommended for current mainnet use, includes a new TPU client that will significantly reduce transaction submission latency.

A year ago, it was very difficult for transactions to make it past the ingress and scheduling phase, which was essentially random. After fixing several bugs with the QUIC implementation and introducing a unified scheduler, the Solana transaction pipeline is now in a much better place.

Agave 2.3, which is recommended for current mainnet use, includes a new TPU client that will significantly reduce transaction submission latency. In addition, Anza engineers have been working with top market makers and RPC services to fix QUIC bugs and leader targeting issues that were impacting transaction landing rates. A change to Triton’s transaction landing has already been seen. Most of these changes are already live, and market makers are now observing 0 p95 slot transaction latency via the standard TPU path.

### Mid-term (3-9 months): DoubleZero, Alpenglow, Asynchronous Program Execution (APE)

In this section, we define mid-term as the next 3-9 months—e.g., projects that are known, in progress, and expected to hit mainnet in Q4 2025 or Q1 2026.

#### DoubleZero

DoubleZero (DZ) is a high-performance dedicated fiber optic network for distributed systems, built to enable blockchains like Solana to achieve throughput and latency numbers not possible over the internet. In addition to providing significantly reduced latency and increased bandwidth, DoubleZero also acts as a powerful filtering layer to protect the Solana network from denial-of-service disruptions, and to offload validators’ and RPCs’ excess traffic processing so they can focus on reducing execution latency and increasing blockspace, leading to increased network REV. DoubleZero will enable Solana transactions, blocks, and consensus messages to be propagated via Multicast, which is a hardware acceleration capability for packet replication, thereby further reducing traffic processing costs on the network and increasing fairness. When combined with low transmission latency and near-zero latency, this means Solana will have the high-performance backbone needed to improve protocol primitives and attract high-quality market makers and additional retail trading volume.

Overall, DoubleZero is expected to have real-world performance on mainnet to significantly improve as the network is adopted by the validator cluster. Latency reductions of up to 100ms (including zero latency) along some routes, and a tenfold increase in available bandwidth for the average Solana validator.

DoubleZero is on testnet today with over 100 validators and 3% of mainnet stake, and is expected to hit mainnet in mid-September 2025. Once DoubleZero mainnet launches, it will take several weeks for long-term Solana mainnet validators to adopt the DoubleZero network, at which point core contributors to Solana can begin raising protocol limits.

#### Alpenglow

Alpenglow is Solana’s brand new, state-of-the-art consensus protocol. The current consensus model provides finality in 32 slots (~12.8s). Alpenglow will finalize blocks in 1-2 slots, or roughly ~150ms.

Alpenglow represents a sweeping set of changes to consensus and block propagation designed to reduce end-to-end latency substantially. Additionally, Alpenglow is actually simpler to reason about than Solana’s current consensus model, which makes development easier and future changes like multiple concurrent leaders and async execution easier to design for and implement as well.

Anza is targeting late 2025/early 2026 for Alpenglow activation on mainnet.

#### Asynchronous Program Execution (APE)

Asynchronous Program Execution (APE) removes execution replay from the critical path of transaction landing, reducing latency.

APE has been a goal for Solana for almost 4 years now, and with the simplifications coming to consensus with Alpenglow, much of the complexity required to implement APE (mostly around special treatment for the vote program) will be removed.

In the past few weeks, there have been a flurry of new SIMDs targeted towards APE. Anza expects it to be activated on mainnet shortly after Alpenglow rolls out in early to mid-2026.

### Long-term (2027+): Multiple Concurrent Leaders (MCL) and Protocol-Enforced Application Controlled Execution (ACE)

In this section, we define long-term plans as those aiming for 2027—e.g., projects that are currently in development by core developers at Anza and across the ecosystem.

#### MCL and ACE

To build the most liquid markets on-chain, we need 3 things:

1.  The chain must have more than enough capacity to ingest all market-relevant information in real time at line rate.
2.  The chain must have fast confirmations and an even faster tick rate (slot time).
3.  The chain must allow applications to control their own execution ordering in order to facilitate experiments with new market microstructures.

At any time in a single-leader blockchain (almost all modern chains are single-leader), a single leader controls access and ordering of transactions during their leader window. This means that if the chain wants to give applications control over their own transaction execution, it must have the cooperation of friendly leaders. In a global permissionless system, you cannot count on friendly leaders to play nice with billion-dollar financial applications.

Multiple concurrent leaders (MCL) is a solution to the Single Leader Problem: the chain can control ordering by enforcing reordering at the replay stage, but this doesn’t prevent validators from selectively including certain transactions and censoring others in order to manipulate the final ordering for their own gain.

To solve the selective censorship problem, the number of leaders who can add transactions to the chain during any given leader window must be increased. If one leader censors a transaction, another may include it, therefore making it difficult for any one leader to control the final execution outcome.

Once transactions have been sorted intra-block in priority order, applications automatically have a lot of leeway to control their own sequencing by reading the priority fee and executing conditional logic based on that. It’s simple to implement cancel prioritization with this setup. In general, it’s also possible to run arbitrary auctions if app developers get creative.

## Interactive: Explore Concepts

### 🔍 Key Terminology

**Application-Controlled Execution (ACE)**: The ability for smart contracts to control their own transaction execution order at millisecond-level.

**Multiple Concurrent Leaders (MCL)**: A solution that allows multiple leaders to process transactions simultaneously, reducing bottlenecks and increasing decentralization.

**Block Assembly Marketplace (BAM)**: Jito’s high-performance transaction processing system, enabling applications to customize transaction ordering rules.

**Alpenglow**: Solana’s new consensus protocol, reducing finality time to ~150ms.

### 💡 Frequently Asked Questions

**Q: Why is ICM important?**
A: ICM creates a more decentralized, transparent, and efficient financial system, allowing everyone to participate without geographical limitations or traditional barriers.

**Q: How is MCL different from Single Leader?**
A: MCL allows multiple leaders to process transactions simultaneously, reducing bottlenecks and increasing censorship resistance, whereas Single Leader creates a single point of congestion.

**Q: When will these features be available?**
A: BAM is launching in late July, Alpenglow in late 2025/early 2026, and MCL/ACE in 2027.

## Conclusion: The Future of Decentralized Finance

Internet Capital Markets represent a significant step forward in democratizing finance. With technical advancements like ACE, MCL, and supporting technologies such as BAM, DoubleZero, and Alpenglow, Solana is building the foundation for a truly global and decentralized financial system.

This journey is not just about technology; it’s about creating a world where everyone has fair access to financial services. From solving the Single Leader Problem to synchronizing global information, every step aims towards the ultimate goal: building the world’s most liquid capital markets on the blockchain.

As we look to the future, it’s clear that ICM is not just a technical concept, but a vision for a more equitable, transparent, and efficient financial system for all.

---

*This article is based on research from [The Internet Capital Markets Roadmap](https://www.anza.xyz/blog/the-internet-capital-markets-roadmap) by Anza. For the latest updates on ICM and Solana, follow the project’s official channels.*

**Author:** Manus AI  
**Publication Date:** August 26, 2025  
**Tags:** #InternetCapitalMarkets #Solana #Blockchain #DeFi #ACE #MCL

---

**Disclaimer:** This article is for informational purposes only and does not constitute financial advice. Please consult with a qualified financial professional before making any investment decisions.

