import React, { useState, useRef } from 'react';
import { SocialPost, Lead, Contract, SafetyRecord } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { 
    ArrowLeft, Calendar, Hash, Image as ImageIcon, MessageSquare, 
    Share2, Facebook, LayoutGrid, Clock, Copy, ExternalLink, 
    Users, TrendingUp, CheckCircle, AlertCircle, Phone, MapPin,
    Briefcase, Camera, UploadCloud, FileText, Award, X, Printer, 
    ShieldCheck, Wind, ThermometerSnowflake, AlertTriangle, HardHat, FileCheck, Search,
    Sparkles, Wand2, Map, Globe, Video, ScanEye, Zap, BrainCircuit, Mic, StopCircle, Play
} from 'lucide-react';

interface MarketingProps {
  onBack: () => void;
}

// Full Post Data
const posts: SocialPost[] = [
  {
    "id": "post_001",
    "date": "2026-02-15",
    "day": "Sunday",
    "category": "Community",
    "status": "scheduled",
    "content": {
      "caption": "Happy Flag Day Weekend, Quispamsis! 🇨🇦🎉\n\nThere’s no place we’d rather be. From the trails at the Q-Plex to the sunsets over the Kennebecasis, we are proud to live here and proud to serve this amazing community.\n\nThere’s nothing better than driving through our own neighborhoods and seeing roofs we’ve built protecting families through another New Brunswick winter. 🏠❄️\n\nWe hope everyone is enjoying the long weekend with family and friends!\n\nWhat’s your favorite winter activity in the KV area? Tell us in the comments! ⬇️",
      "hashtags": ["#QuispamsisNB", "#FlagDay", "#CommunityFirst", "#LocalBusiness", "#PaulsRoofing", "#KV", "#Rothesay", "#LoveWhereYouLive"]
    },
    "visual_brief": "Snowy neighborhood scene in Quispamsis with Paul's Roofing logo overlay.",
    "cta": "Engagement (Comment)"
  },
  {
    "id": "post_002",
    "date": "2026-02-16",
    "day": "Monday",
    "category": "Motivation",
    "status": "scheduled",
    "content": {
      "caption": "Happy Monday, Quispamsis! ☀️\n\nThe snow is still here, but we know spring is coming. Let’s tackle this week head-on! 💪\n\nWhether you're shoveling out or heading to work, stay safe out there. Your home is your castle—we're just here to make sure it has a good helmet. 😉\n\nLet's make it a great week!",
      "hashtags": ["#MondayMotivation", "#QuispamsisNB", "#PaulsRoofing", "#KV", "#Rothesay", "#LocalBusiness"]
    },
    "visual_brief": "Sun hitting a roof or truck at job site. Bright/Clean.",
    "cta": "None (Brand Awareness)"
  },
  {
    "id": "post_003",
    "date": "2026-02-17",
    "day": "Tuesday",
    "category": "Education",
    "status": "scheduled",
    "content": {
      "caption": "🏠 ROOF TIP TUESDAY: The \"Ice Dam\" Danger ❄️\n\nWe all love how icicles look in winter photos, but did you know they can signal a big problem?\n\nWhen heat escapes your attic, it melts the snow on your roof. That water runs down to the cold eaves and freezes again, creating an \"Ice Dam.\"\n\nWhy does it matter?\nTrapped water can back up *under* your shingles and leak into your walls. 🚫💧\n\nHere are 3 signs you might have an issue:\n✅ Giant icicles on the gutters\n✅ Water stains on your ceiling\n✅ Uneven snow melt on your roof\n\nCatching these signs early can save you thousands in repairs! 💰\n\nQuestions about your roof's ventilation? We're here to help!\n📞 506-271-4162 | paulroofs.com",
      "hashtags": ["#RoofingTips", "#IceDams", "#HomeMaintenanceTips", "#QuispamsisNB", "#PaulsRoofing"]
    },
    "visual_brief": "Icicles on gutter or graphic of ice backing up under shingles.",
    "cta": "Call/Website"
  },
  {
    "id": "post_004",
    "date": "2026-02-18",
    "day": "Wednesday",
    "category": "Service Highlight",
    "status": "scheduled",
    "content": {
      "caption": "EMERGENCY REPAIR SPOTLIGHT 🔦\n\nDid you know we offer 24/7 Emergency Service?\n\nWinter isn't over yet, and Atlantic Canada weather can be unpredictable. If you see a leak, don't wait for spring!\n\nWe are ready for:\n✅ Storm damage repairs\n✅ Sudden leaks\n✅ Ice dam removal\n✅ Temporary tarping\n\nPerfect for peace of mind while we wait for the warmer weather. 🏡\n\nGot a roofing worry keeping you up at night? Let's chat!\n📞 506-271-4162",
      "hashtags": ["#EmergencyRoofing", "#RoofingServices", "#PaulsRoofing", "#QuispamsisNB", "#SaintJohn"]
    },
    "visual_brief": "Team working in winter gear or truck with phone number visible.",
    "cta": "Call (Emergency)"
  },
  {
    "id": "post_005",
    "date": "2026-02-19",
    "day": "Thursday",
    "category": "Social Proof",
    "status": "scheduled",
    "content": {
      "caption": "CUSTOMER LOVE 💙\n\n\"Paul and his team were lifesavers. We had a leak during that last freeze, and they came out same-day to secure it. Honest, fast, and local.\"\n- Sarah M., Quispamsis\n\nStories like this are why we do what we do! Thank you for trusting us with your home. 🏡\n\nWe don't just build roofs; we build relationships in our community.\n\nReady to experience the Paul's Roofing difference?\n📞 506-271-4162\n🌐 paulroofs.com",
      "hashtags": ["#HappyCustomers", "#5StarService", "#QuispamsisNB", "#PaulsRoofing", "#LocalReviews"]
    },
    "visual_brief": "5-star graphic or happy homeowner photo.",
    "cta": "Call/Website"
  },
  {
    "id": "post_006",
    "date": "2026-02-20",
    "day": "Friday",
    "category": "Engagement",
    "status": "scheduled",
    "content": {
      "caption": "FILL IN THE BLANK! ✍️\n\nThe first thing I’m doing when the snow melts is _____________.\n\nDrop your answer in the comments! We're dreaming of BBQ season... 🍔🌭\n\n(And hey, before you fire up that grill, take a look up at your shingles! A great summer starts with a secure roof. 😉)",
      "hashtags": ["#FridayFun", "#HomeOwnerPride", "#QuispamsisNB", "#PaulsRoofing", "#SpringDreaming"]
    },
    "visual_brief": "Relaxing photo (BBQ in snow or deck chair).",
    "cta": "Comment"
  },
  {
    "id": "post_007",
    "date": "2026-02-21",
    "day": "Saturday",
    "category": "Value Prop",
    "status": "scheduled",
    "content": {
      "caption": "WHY CHOOSE PAUL'S ROOFING? 🏆\n\n✅ Local Experts: We know Quispamsis weather better than anyone.\n✅ Fair Pricing: No hidden fees, just honest quotes.\n✅ Quality Materials: We use shingles that last.\n✅ 24/7 Support: We pick up the phone when you call.\n\nWe're not just roofers—we're your partners in protecting your home.\n\nReady to get on our Spring Estimate List? Beat the rush!\n📞 506-271-4162\n\n\"For roofs that are big, and some that are small, our advice is simple: Better Call Paul!\"",
      "hashtags": ["#WhyChooseUs", "#PaulsRoofing", "#QuispamsisNB", "#BetterCallPaul"]
    },
    "visual_brief": "High quality finished roof photo.",
    "cta": "Call (Estimate List)"
  },
  {
    "id": "post_008",
    "date": "2026-02-22",
    "day": "Sunday",
    "category": "Behind Scenes",
    "status": "scheduled",
    "content": {
      "caption": "BEHIND THE SCENES: Preparing for the Spring Rush! 💪\n\nThe snow is still on the ground, but at Paul's Roofing, we are already gearing up for a busy season.\n\nChecking equipment, stocking materials, and reviewing safety protocols—so when the weather breaks, we are ready to roll on Day 1.\n\nThis is the dedication that goes into protecting your home. 🏡\n\nGot a project in mind for this spring? We are ready!\n📞 506-271-4162",
      "hashtags": ["#TeamWork", "#RoofingPros", "#PaulsRoofing", "#QuispamsisNB", "#ReadyToWork"]
    },
    "visual_brief": "Truck wash, gear check, or ladders stacked.",
    "cta": "Call"
  },
  {
    "id": "post_009",
    "date": "2026-02-23",
    "day": "Monday",
    "category": "Education",
    "status": "scheduled",
    "content": {
      "caption": "DID YOU KNOW? 🤔\n\nSnow is heavier than it looks!\n\nA cubic foot of fresh snow weighs about 3-5 lbs, but wet, packed snow (like we get in late Feb) can weigh 20 lbs or more per cubic foot!\n\nWhy does this matter?\nThat extra weight puts stress on your roof structure. If you see your roofline sagging or hear creaking sounds inside, don't ignore it.\n\nMost homeowners don't realize winter damage happens silently. 🤫\n\nWant a professional opinion? Give us a call!\n📞 506-271-4162",
      "hashtags": ["#RoofingFacts", "#HomeownerEducation", "#PaulsRoofing", "#QuispamsisNB", "#SnowLoad"]
    },
    "visual_brief": "Heavy snow load on roof or truss graphic.",
    "cta": "Call"
  },
  {
    "id": "post_010",
    "date": "2026-02-24",
    "day": "Tuesday",
    "category": "Transformation",
    "status": "scheduled",
    "content": {
      "caption": "TRANSFORMATION TUESDAY! 🔨➡️✨\n\nSometimes it's the small things that cause the biggest headaches.\n\nBEFORE: A cracked vent boot letting water sneak into the attic. 💧\nAFTER: Sealed tight and weather-proof! ✅\n\nThis Quispamsis homeowner called because they spotted a damp spot on the ceiling. We found the culprit and fixed it fast.\n\nYour roof. Your home. PROTECTED. ✨\n\nDon't let a small leak turn into a big renovation.\n📞 506-271-4162 | paulroofs.com",
      "hashtags": ["#BeforeAndAfter", "#RoofRepair", "#PaulsRoofing", "#QuispamsisNB", "#LeakRepair"]
    },
    "visual_brief": "Split image: Damaged vent vs. New sealed vent.",
    "cta": "Call/Web"
  },
  {
    "id": "post_011",
    "date": "2026-02-25",
    "day": "Wednesday",
    "category": "Team Spotlight",
    "status": "scheduled",
    "content": {
      "caption": "MEET THE TEAM: Spotlight on the Boss! ⭐\n\nIf you've worked with us, you know Paul. He's not just the name on the truck—he's involved in every project we take on.\n\nWith years of experience in NB roofing, Paul built this company on one simple rule: Treat every roof like it's your own mother's house. 💙\n\nWhen he's not up on a ladder, you'll find him [mention hobby].\n\n\"We don't cut corners. Period.\"\n\nQuestions about your roof? Ask Paul directly! 👇",
      "hashtags": ["#TeamSpotlight", "#PaulsRoofing", "#LocalExperts", "#QuispamsisNB", "#FamilyBusiness"]
    },
    "visual_brief": "Photo of Paul/Foreman smiling.",
    "cta": "Engagement"
  },
  {
    "id": "post_012",
    "date": "2026-02-26",
    "day": "Thursday",
    "category": "Throwback",
    "status": "scheduled",
    "content": {
      "caption": "THROWBACK THURSDAY! 📸☀️\n\nRemember this beauty we finished last summer?\n\nBlue skies, green grass, and brand new shingles. We are counting down the days until roofing weather looks like this again!\n\nPlanning a summer renovation?\nThe best time to book is actually right now while it's still cold. Beat the line!",
      "hashtags": ["#TBT", "#ThrowbackThursday", "#PaulsRoofing", "#QuispamsisNB", "#SummerVibes"]
    },
    "visual_brief": "Bright sunny summer roof photo.",
    "cta": "Book Now (Soft)"
  },
  {
    "id": "post_013",
    "date": "2026-02-27",
    "day": "Friday",
    "category": "Fun",
    "status": "scheduled",
    "content": {
      "caption": "CAPTION THIS! 😄\n\nWe arrived at the job site and found... well, this situation.\n\nDrop your best caption in the comments! 👇\nWinner gets... our eternal respect (and maybe a Paul's Roofing hat if we find one in the truck 😉).",
      "hashtags": ["#FunFriday", "#RoofingHumor", "#PaulsRoofing", "#QuispamsisNB", "#CaptionThis"]
    },
    "visual_brief": "Funny photo (squirrel, massive snow pile, meme).",
    "cta": "Comment"
  },
  {
    "id": "post_014",
    "date": "2026-02-28",
    "day": "Saturday",
    "category": "Sales Pitch",
    "status": "scheduled",
    "content": {
      "caption": "FEBRUARY IS OVER! (Almost) 🙌\n\nYou know what that means? March Break is around the corner, and the snow melt is coming.\n\nPro Tip: The \"Spring Rush\" for roofers starts the moment the first robin sings. 🐦\n\nDon't wait in line! Get your name on our estimate list *now*.\n\nWe'll schedule your free inspection for the first clear day. No obligation, just a head start.\n\n📞 506-271-4162\n🌐 paulroofs.com",
      "hashtags": ["#SpringReady", "#EarlyBird", "#PaulsRoofing", "#QuispamsisNB", "#SaintJohn"]
    },
    "visual_brief": "Calendar graphic with SPRING circled.",
    "cta": "Call/Web"
  },
  {
    "id": "post_015",
    "date": "2026-03-01",
    "day": "Sunday",
    "category": "Seasonal Check-in",
    "status": "scheduled",
    "content": {
      "caption": "HELLO MARCH! 🦁➡️🐑\n\nWe made it! Meteorological Spring is officially here.\n\nIn Quispamsis, March is the month of the \"Freeze/Thaw Cycle.\" ❄️☀️\n\nDays get warmer, snow melts, water runs into cracks... and then nights freeze it solid again. This expansion and contraction is the #1 enemy of aging shingles.\n\nWhat to watch for this month:\n⚠️ Granules in your gutter downspouts (looks like sand)\n⚠️ Curled shingle edges\n⚠️ Damp spots in the attic\n\nSpring is coming... makes sure your roof is ready for the rain!",
      "hashtags": ["#MarchMadness", "#SpringIsComing", "#RoofingMaintenance", "#QuispamsisNB", "#PaulsRoofing"]
    },
    "visual_brief": "Melting snow dripping off roof or calendar flipping to March.",
    "cta": "Awareness"
  },
  {
    "id": "post_016",
    "date": "2026-03-02",
    "day": "Monday",
    "category": "Education",
    "status": "scheduled",
    "content": {
      "caption": "HOW TO: Check Your Roof Like a Pro (Without a Ladder!) 🪜🚫\n\nYou don't need to climb up there to spot trouble. In fact, we recommend you stay on the ground until the ice is gone!\n\nThe Binocular Trick: 🔭\nGrab a pair of binoculars and scan your roof from the driveway.\n\nLook for:\n1. Missing Shingles: Dark spots where tabs have blown off.\n2. Raised Nails: Look for little bumps pushing up the shingles.\n3. Flashing Gaps: Check around the chimney—is the metal pulled away?\n\nSpot something suspicious? Don't climb. Call Paul.\nWe have the safety gear to get up there securely.\n\n📞 506-271-4162",
      "hashtags": ["#SafetyFirst", "#DIYTips", "#RoofingAdvice", "#QuispamsisNB", "#HomeownerTips"]
    },
    "visual_brief": "Person looking up with binoculars or ground-view of roof.",
    "cta": "Call"
  },
  {
    "id": "post_017",
    "date": "2026-03-03",
    "day": "Tuesday",
    "category": "Transformation",
    "status": "scheduled",
    "content": {
      "caption": "TRANSFORMATION TUESDAY! 🏠✨\n\nFrom \"Weathered Grey\" to \"Midnight Black!\" 🖤\n\nThis Quispamsis home got a major curb appeal upgrade. Not only does the new roof look incredible, but these architectural shingles come with a wind rating that laughs at Atlantic storms. 🌬️\n\nBefore: 20-year-old 3-tab shingles (brittle and cracking).\nAfter: High-definition architectural shingles (durable and stunning).\n\nYour roof. Your home. TRANSFORMED. ✨\n\nReady for your makeover?\n📞 506-271-4162 | paulroofs.com",
      "hashtags": ["#BeforeAndAfter", "#RoofTransformation", "#PaulsRoofing", "#QuispamsisNB", "#CurbAppeal"]
    },
    "visual_brief": "High contrast Before/After photo (Grey to Black shingles).",
    "cta": "Call/Web"
  },
  {
    "id": "post_018",
    "date": "2026-03-04",
    "day": "Wednesday",
    "category": "Community",
    "status": "scheduled",
    "content": {
      "caption": "Happy Wednesday, KV! 👋\n\nWe love working in this community. There's nothing better than finishing a job and seeing a neighbor wave from across the street.\n\nWe believe in supporting local—whether that's buying our lumber locally, grabbing coffee from local shops, or hiring local crew members.\n\nWhen you support Paul's Roofing, you're supporting a business that lives, works, and gives back right here in Quispamsis. 💙\n\nTag your favorite local business in the comments! Let's show them some love! 👇",
      "hashtags": ["#CommunitySupport", "#QuispamsisNB", "#ShopLocal", "#LocalBusiness", "#PaulsRoofing"]
    },
    "visual_brief": "Truck parked at local landmark (Q-Plex/Coffee shop).",
    "cta": "Comment/Tag"
  },
  {
    "id": "post_019",
    "date": "2026-03-05",
    "day": "Thursday",
    "category": "Testimonial (Trust)",
    "status": "scheduled",
    "content": {
      "caption": "CUSTOMER STORY: Honesty Matters. 🤝\n\nWe recently visited a homeowner who was convinced they needed a whole new roof (and was dreading the cost!).\n\nThe Inspection: Paul went up, took a look, and came down with good news.\n\"Your shingles are fine,\" he said. \"You just have a bad seal around the chimney.\"\n\nThe Result: A simple repair instead of a full replacement. Saved them thousands! 💰\n\nWe will never sell you a roof you don't need. That's the Paul's Roofing promise.\n\n\"Paul was honest, direct, and saved us a fortune. Customers for life!\"\n\nNeed an honest opinion?\n📞 506-271-4162",
      "hashtags": ["#HonestTrades", "#Integrity", "#PaulsRoofing", "#QuispamsisNB", "#TrustedLocal"]
    },
    "visual_brief": "Photo of repaired flashing or text graphic with quote.",
    "cta": "Call"
  },
  {
    "id": "post_020",
    "date": "2026-03-06",
    "day": "Friday",
    "category": "Interactive",
    "status": "scheduled",
    "content": {
      "caption": "THE GREAT DEBATE! 🤔\n\nWe install them all, but every homeowner has a preference.\n\nTeam Metal Roof 🆚 Team Shingles\n\nA) Metal: Sleek, modern, lasts forever (but can be noisy in the rain! ☔)\nB) Shingles: Classic look, cost-effective, quiet, and easy to repair.\n\nWhich one would YOU choose for your dream home?\n\nVote A or B in the comments! 👇",
      "hashtags": ["#FridayFun", "#RoofingDebate", "#QuispamsisNB", "#PaulsRoofing", "#DreamHome"]
    },
    "visual_brief": "Split image: Metal Roof vs Shingle Roof.",
    "cta": "Comment/Vote"
  },
  {
    "id": "post_021",
    "date": "2026-03-07",
    "day": "Saturday",
    "category": "Soft Sell",
    "status": "scheduled",
    "content": {
      "caption": "We don't just nail down shingles.\nWe protect what's underneath them. 👨‍👩‍👧‍👦\n\nYour family, your memories, your comfort.\n\nWhen the next storm rolls off the Bay of Fundy, you should be able to sleep soundly knowing your roof was built by Paul's Roofing.\n\nPeace of mind is just a phone call away.\n\n📞 506-271-4162\n🌐 paulroofs.com",
      "hashtags": ["#PeaceOfMind", "#FamilyHome", "#PaulsRoofing", "#QuispamsisNB", "#SaintJohn"]
    },
    "visual_brief": "Cozy house at dusk with lights on.",
    "cta": "Call/Web"
  },
  {
    "id": "post_022",
    "date": "2026-03-08",
    "day": "Sunday",
    "category": "Weather Watch",
    "status": "scheduled",
    "content": {
      "caption": "WEATHER ALERT: The \"Big Melt\" is coming! ☀️💧\n\nCheck the forecast, Quispamsis! We’ve got positive temps on the way.\n\nWhile we love the warmer weather, this is the moment of truth for your roof.\nRapid melting = Heavy water flow.\n\nIf your gutters are clogged or your flashing is loose, this is when you'll find out. (And nobody wants to find out with a drip in the living room! 😫)\n\nQuick Tip: Take a walk around your house today. Look for loose downspouts or debris.\n\nStay dry out there!\n📞 506-271-4162",
      "hashtags": ["#WeatherWatch", "#SpringMelt", "#QuispamsisNB", "#PaulsRoofing", "#RoofingCheck"]
    },
    "visual_brief": "Weather app screenshot or dripping eaves.",
    "cta": "Call"
  },
  {
    "id": "post_023",
    "date": "2026-03-09",
    "day": "Monday",
    "category": "Motivation",
    "status": "scheduled",
    "content": {
      "caption": "Happy Monday! ☕\n\nNew Season. New Goals. New Roof?\n\nSpring is the perfect time to tackle those home improvement projects you put off last year.\n\nWhether it's a full replacement or just fixing that one annoying shingle, getting it done EARLY means you can enjoy your summer worry-free.\n\nLet's make it a productive week! 💪",
      "hashtags": ["#MondayMotivation", "#SpringCleaning", "#HomeReno", "#QuispamsisNB", "#PaulsRoofing"]
    },
    "visual_brief": "Pristine finished roof with blue sky.",
    "cta": "None"
  },
  {
    "id": "post_024",
    "date": "2026-03-10",
    "day": "Tuesday",
    "category": "Tip Tuesday",
    "status": "scheduled",
    "content": {
      "caption": "ROOF TIP TUESDAY: Don't Forget the Gutters! 🍂🚫\n\nYour roof sheds the water, but your gutters have to carry it away.\n\nIf your gutters are clogged with last fall's leaves (or ice build-up), that melting snow has nowhere to go. It can back up under your shingles or pour down your foundation.\n\nThe Fix:\nOnce the ice clears, give them a quick check. A clear path for water = a happy home. 🏠\n\nDon't like ladders? We can check your entire roofing system for you.\n\nSchedule your Spring Inspection:\n📞 506-271-4162",
      "hashtags": ["#GutterCleaning", "#RoofingMaintenance", "#QuispamsisNB", "#PaulsRoofing", "#TipTuesday"]
    },
    "visual_brief": "Clogged vs Clean gutter photo.",
    "cta": "Call (Inspection)"
  },
  {
    "id": "post_025",
    "date": "2026-03-11",
    "day": "Wednesday",
    "category": "Tease",
    "status": "scheduled",
    "content": {
      "caption": "BIG ANNOUNCEMENT COMING SOON... 🤫📢\n\nWe’ve been working on something special for our Quispamsis neighbors to kick off the 2026 season.\n\nKeep your eyes peeled on this page later this week. You won't want to miss it!\n\n(Hint: It involves protecting your home and saving you stress. 😉)\n\nTurn on post notifications! 🔔",
      "hashtags": ["#StayTuned", "#BigNews", "#QuispamsisNB", "#PaulsRoofing", "#SpringLaunch"]
    },
    "visual_brief": "Graphic saying \"COMING SOON\" or truck with \"Shhh\" emoji.",
    "cta": "Turn on Notifications"
  },
  {
    "id": "post_026",
    "date": "2026-03-12",
    "day": "Thursday",
    "category": "Social Proof",
    "status": "scheduled",
    "content": {
      "caption": "THROWBACK... to a roof that still looks brand new! 📸\n\nWe installed this roof back in 2020. Through wind storms, hurricanes, and freezing winters, it hasn't lost a single shingle.\n\nThat's the Paul's Roofing Difference.\n\nWe don't just build for today; we build for the next 20 years. 🗓️\n\nWhen you hire us, you're investing in the long haul.",
      "hashtags": ["#BuiltToLast", "#QualityWork", "#PaulsRoofing", "#QuispamsisNB", "#CustomerSatisfaction"]
    },
    "visual_brief": "Photo of an older project that still looks good.",
    "cta": "None"
  },
  {
    "id": "post_027",
    "date": "2026-03-13",
    "day": "Friday",
    "category": "Fun/Crew",
    "status": "scheduled",
    "content": {
      "caption": "Fueling up for the weekend! ☕🍩\n\nThe only thing we take as seriously as roofing? Our coffee orders.\n\nIt's been a great week of prep and repairs. We’re ready to recharge and hit the ground running for the official start of the season next week.\n\nWhat's your go-to Tim's order? Tell us below! 👇\n(Paul is a Double Double guy, obviously. 🇨🇦)",
      "hashtags": ["#CrewLife", "#TimHortonsRun", "#QuispamsisNB", "#PaulsRoofing", "#FridayVibes"]
    },
    "visual_brief": "Crew with Tim Hortons coffee.",
    "cta": "Comment"
  },
  {
    "id": "post_028",
    "date": "2026-03-14",
    "day": "Saturday",
    "category": "Value Prop",
    "status": "scheduled",
    "content": {
      "caption": "Your home is your biggest investment. Don't gamble with it. 🎲🚫\n\nWhen you hire a roofer, you need to know three things:\n1. Will they show up?\n2. Will the price change?\n3. Will the roof leak next year?\n\nWith Paul's Roofing, the answers are:\n✅ YES, on time.\n✅ NO, our quote is our word.\n✅ NO, we stand behind our work.\n\nSimple as that.\n\nTomorrow is the big day... get ready!",
      "hashtags": ["#NoGambling", "#TrustedPros", "#PaulsRoofing", "#QuispamsisNB", "#SaintJohn"]
    },
    "visual_brief": "Graphic listing: Licensed. Insured. Local. Guaranteed.",
    "cta": "None (Tease)"
  },
  {
    "id": "post_029",
    "date": "2026-03-15",
    "day": "Sunday",
    "category": "LAUNCH",
    "status": "scheduled",
    "content": {
      "caption": "🚨 SPRING BOOKING IS OFFICIALLY OPEN! 🚨\n\nThe snow is melting, the birds are singing, and the Paul's Roofing calendar is OPEN for the season! 🗓️\n\nWe are now booking estimates for April and May projects.\n\n⚠️ Fair Warning: Our spring slots fill up FAST. Every year, we have to turn people away in June because we're booked solid.\n\nDo not wait until you have a leak.\n\nSecure your spot on the list today. It takes 2 minutes to call, and it saves you months of worry.\n\nLet's get to work, Quispamsis!\n📞 506-271-4162\n🌐 paulroofs.com",
      "hashtags": ["#SpringLaunch", "#BookNow", "#RoofingSeason", "#QuispamsisNB", "#PaulsRoofing", "#SaintJohn", "#KV"]
    },
    "visual_brief": "High energy graphic: SPRING BOOKINGS OPEN with phone number.",
    "cta": "Call (Hard Sell)"
  }
];

// Mock Leads Data
const leads: Lead[] = [
    {
        "lead_id": "auto-generated-001",
        "timestamp": "2026-02-14 10:30:00",
        "status": "new",
        "source": "website_form",
        "customer": {
            "name": "Jane Doe",
            "phone": "506-555-0199",
            "address": "123 Stock Farm Rd"
        },
        "project_details": {
            "type": "shingle_replace",
            "urgency": "high",
            "notes": "Leaking near chimney"
        }
    },
    {
        "lead_id": "auto-generated-002",
        "timestamp": "2026-02-13 15:45:00",
        "status": "contacted",
        "source": "emergency_call_log",
        "customer": {
            "name": "Mike Ross",
            "phone": "506-555-0245",
            "address": "45 Gondola Point Rd"
        },
        "project_details": {
            "type": "repair",
            "urgency": "medium",
            "notes": "Missing shingles from wind storm"
        }
    }
];

// Mock Contracts Data
const mockContracts: Contract[] = [
  {
    id: "CNT-2026-042",
    clientName: "Robert Miller",
    address: "78 Hampton Rd, Rothesay",
    status: "active",
    startDate: "2026-02-10",
    photos: []
  },
  {
    id: "CNT-2026-039",
    clientName: "Sarah Jenkins",
    address: "12 Cedarwood Dr, Quispamsis",
    status: "paid", // Ready for warranty
    startDate: "2026-01-28",
    photos: []
  }
];

export const Marketing: React.FC<MarketingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'leads' | 'jobs' | 'safety' | 'ai_studio'>('dashboard');
  const [simulatedDate] = useState('2026-02-15'); // Launch Day
  const [searchQuery, setSearchQuery] = useState('');
  
  // Job Jacket State
  const [activeContracts] = useState<Contract[]>(mockContracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [evidenceCategory, setEvidenceCategory] = useState<'before' | 'during' | 'after'>('before');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [showWarranty, setShowWarranty] = useState(false);

  // Safety / Guardian State
  const [safetyContract, setSafetyContract] = useState<Contract | null>(null);
  const [safetyRecord, setSafetyRecord] = useState<SafetyRecord | null>(null);

  // AI Studio State
  const [aiTool, setAiTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mediaData, setMediaData] = useState<string | null>(null); // For image/audio uploads
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [generatedMedia, setGeneratedMedia] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K'|'2K'|'4K'>('1K');
  const [videoRatio, setVideoRatio] = useState<'16:9'|'9:16'>('16:9');
  
  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Filtering Logic
  const filteredPosts = posts.filter(post => 
    post.content.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.date.includes(searchQuery)
  );

  const filteredLeads = leads.filter(lead => 
    lead.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.customer.phone.includes(searchQuery) ||
    lead.customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.project_details.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContracts = activeContracts.filter(contract => 
    contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dashboard Logic
  const todayPost = posts.find(p => p.date === simulatedDate);
  const nextPost = posts.find(p => p.date === '2026-02-16');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Caption copied to clipboard!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setIsUploading(true);
        setUploadStatus('Processing 3 images...');
        
        // Simulating upload delay
        setTimeout(() => {
            setIsUploading(false);
            setUploadStatus('Upload Complete');
            setUploadedPhotos([
                'https://images.unsplash.com/photo-1632759930722-e3a510526e03?q=80&w=200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1596253255146-51e605d3b134?q=80&w=200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1627514332924-406cb493108c?q=80&w=200&auto=format&fit=crop'
            ]);
        }, 2000);
    }
  };

  // AI Studio Handlers
  const handleAIMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setMediaData(base64String);
        setMediaType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
             const base64String = (reader.result as string).split(',')[1];
             setMediaData(base64String);
             setMediaType('audio/webm');
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const runAI = async () => {
    if (!process.env.API_KEY) {
        alert("API Key is missing!");
        return;
    }
    
    setIsLoading(true);
    setResponse('');
    setGeneratedMedia(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        if (aiTool === 'editor') {
             // Gemini 2.5 Flash Image - Edit
            if (!mediaData) throw new Error("Please upload an image first.");
            const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash-image' });
             const result = await model.generateContent({
                contents: [
                    { role: 'user', parts: [{ text: prompt || "Edit this image" }, { inlineData: { mimeType: mediaType || 'image/png', data: mediaData } }] }
                ]
            });
            // Check for image in response (handling multiple parts)
            let textOutput = '';
             for (const part of result.response.candidates[0].content.parts) {
                if (part.inlineData) {
                    setGeneratedMedia(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
                } else if (part.text) {
                    textOutput += part.text;
                }
            }
            setResponse(textOutput);

        } else if (aiTool === 'generator') {
            // Gemini 3 Pro Image Preview - Generate
            const model = ai.getGenerativeModel({ model: 'gemini-3-pro-image-preview' });
            const result = await model.generateContent({
                 contents: [{ role: 'user', parts: [{ text: prompt }] }],
                 config: {
                    imageConfig: {
                         imageSize: imageSize
                     }
                 }
            });
             for (const part of result.response.candidates[0].content.parts) {
                if (part.inlineData) {
                    setGeneratedMedia(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
                } else if (part.text) {
                    setResponse(part.text);
                }
            }

        } else if (aiTool === 'maps') {
            // Gemini 2.5 Flash + Google Maps
            const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash', tools: [{googleMaps: {}}] });
            const result = await model.generateContent({
                 contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });
            setResponse(result.response.text());
            // You can also process result.response.candidates[0].groundingMetadata?.groundingChunks here

        } else if (aiTool === 'search') {
            // Gemini 3 Flash Preview + Google Search
            const model = ai.getGenerativeModel({ model: 'gemini-3-flash-preview', tools: [{googleSearch: {}}] });
            const result = await model.generateContent({
                 contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });
            setResponse(result.response.text());

        } else if (aiTool === 'video') {
            // Veo 3.1 Fast Generate Preview
            // Note: generateVideos is on the model instance, but SDK structure might vary. 
            // Using the pattern from instructions: ai.models.generateVideos
            // However, SDK instance `ai` usually has `getGenerativeModel`. 
            // Correct per instructions: `ai.models.generateVideos` seems to imply a different client structure or directly accessing models.
            // But since we initialized `new GoogleGenAI`, we use `ai.languageModel` or similar? 
            // Actually, for Veo, the instructions use `ai.models.generateVideos` directly on the client instance if using a specific version, 
            // but standard SDK usage is `ai.getGenerativeModel`. 
            // Let's assume the standard `getGenerativeModel` doesn't support `generateVideos` directly yet in typical flows or use the instruction's exact syntax if `ai` is the client.
            // Re-reading instructions: "const ai = new GoogleGenAI... await ai.models.generateVideos". 
            // This implies the `GoogleGenAI` instance has a `models` property. 
            
            // @ts-ignore - Ignoring TS for dynamic SDK method access as per specific instruction pattern
            let operation = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                prompt: prompt,
                config: {
                    numberOfVideos: 1,
                    aspectRatio: videoRatio
                }
            });
            
             while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                // @ts-ignore
                operation = await ai.operations.getVideosOperation({operation: operation});
            }
             // @ts-ignore
            const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (uri) {
                // Mock fetching the actual bytes or just using the URI with key
                setGeneratedMedia(`${uri}&key=${process.env.API_KEY}`); 
                // Note: The instruction says fetch output. We'll set it as video src for now.
            }
            setResponse("Video generation complete.");

        } else if (aiTool === 'analyzer') {
            // Gemini 3 Pro Preview - Image Understanding
             if (!mediaData) throw new Error("Please upload an image first.");
             const model = ai.getGenerativeModel({ model: 'gemini-3-pro-preview' });
             const result = await model.generateContent({
                contents: [
                    { role: 'user', parts: [{ text: prompt || "Analyze this image" }, { inlineData: { mimeType: mediaType || 'image/jpeg', data: mediaData } }] }
                ]
            });
            setResponse(result.response.text());

        } else if (aiTool === 'fast') {
             // Gemini 2.5 Flash Lite
             const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash-lite-latest' });
             const result = await model.generateContent({
                 contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });
            setResponse(result.response.text());

        } else if (aiTool === 'thinking') {
             // Gemini 3 Pro Preview - Thinking Mode
             const model = ai.getGenerativeModel({ model: 'gemini-3-pro-preview' });
             const result = await model.generateContent({
                 contents: [{ role: 'user', parts: [{ text: prompt }] }],
                 config: {
                     thinkingConfig: { thinkingBudget: 32768 }
                 }
            });
            setResponse(result.response.text());

        } else if (aiTool === 'audio') {
             // Gemini 3 Flash Preview - Audio Transcription
             if (!mediaData) throw new Error("Please record audio first.");
             const model = ai.getGenerativeModel({ model: 'gemini-3-flash-preview' });
             const result = await model.generateContent({
                contents: [
                    { role: 'user', parts: [{ text: "Transcribe this audio" }, { inlineData: { mimeType: 'audio/webm', data: mediaData } }] }
                ]
            });
            setResponse(result.response.text());
        }

    } catch (error: any) {
        console.error(error);
        setResponse(`Error: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  const getWarrantyDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getExpirationDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 10);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  const generateDSR = (contract: Contract) => {
    // Mock Weather Data from "Nerve Center"
    const temp = -4;
    const wind = 25;
    
    const hazards = ["Fall from heights (General)", "Ladder stability on ice/snow"];
    if (temp < 0) hazards.push("Slippery conditions due to freezing temps");
    if (wind > 20) hazards.push("High wind load - secure all materials");
    
    setSafetyRecord({
        id: `DSR-${Math.floor(Math.random() * 1000)}`,
        contractId: contract.id,
        date: new Date().toLocaleDateString(),
        foreman: "Paul",
        temperature: temp,
        windSpeed: wind,
        hazards: hazards,
        ppe: ["Harnesses", "Anchors", "Hard Hats", "Steel Toes"],
        status: 'draft'
    });
    setSafetyContract(contract);
  };
  
  const toolCategories = [
    {
      title: 'Content Creation',
      icon: Wand2,
      tools: [
        { id: 'editor', name: 'Nano Editor', icon: Wand2, desc: 'Edit photos with text commands', model: 'Gemini 2.5 Flash Image' },
        { id: 'generator', name: 'Visualizer Pro', icon: ImageIcon, desc: 'Generate 4K marketing assets', model: 'Gemini 3 Pro Image' },
        { id: 'video', name: 'Veo Studio', icon: Video, desc: 'Generate marketing videos', model: 'Veo 3.1 Fast' },
      ]
    },
    {
      title: 'Analysis & Strategy',
      icon: ScanEye,
      tools: [
        { id: 'search', name: 'Market Intel', icon: Globe, desc: 'Web-grounded research', model: 'Gemini 3 Flash + Search' },
        { id: 'analyzer', name: 'Damage Inspector', icon: ScanEye, desc: 'Deep image analysis', model: 'Gemini 3 Pro' },
        { id: 'thinking', name: 'Strategy Engine', icon: BrainCircuit, desc: 'Complex reasoning tasks', model: 'Gemini 3 Pro (Thinking)' },
      ]
    },
    {
      title: 'Productivity',
      icon: Zap,
      tools: [
        { id: 'maps', name: 'Site Scout', icon: Map, desc: 'Location-grounded intel', model: 'Gemini 2.5 Flash + Maps' },
        { id: 'fast', name: 'Quick Chat', icon: Zap, desc: 'Instant roofing answers', model: 'Gemini 2.5 Flash Lite' },
        { id: 'audio', name: 'Voice Memo', icon: Mic, desc: 'Transcribe site notes', model: 'Gemini 3 Flash' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-white pb-24 relative">
      {/* Top Bar */}
      <div className="bg-navy-900 border-b border-white/5 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button 
                onClick={onBack}
                className="p-2 hover:bg-navy-800 rounded-full text-slate-400 hover:text-white transition-colors"
             >
                <ArrowLeft size={24} />
             </button>
             <div className="h-8 w-px bg-white/10"></div>
             <div>
                <h1 className="font-display font-bold uppercase text-xl text-white tracking-wide">Marketing <span className="text-teal-400">Hub</span></h1>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Internal Access</p>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-navy-950 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 w-48 transition-all"
                />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'dashboard' ? 'bg-teal-400 text-navy-900' : 'text-slate-400 hover:text-white'}`}
                >
                    Command Center
                </button>
                <button 
                    onClick={() => setActiveTab('calendar')}
                    className={`px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'calendar' ? 'bg-teal-400 text-navy-900' : 'text-slate-400 hover:text-white'}`}
                >
                    Calendar
                </button>
                <button 
                    onClick={() => setActiveTab('leads')}
                    className={`px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'leads' ? 'bg-teal-400 text-navy-900' : 'text-slate-400 hover:text-white'}`}
                >
                    Leads
                </button>
                <button 
                    onClick={() => setActiveTab('jobs')}
                    className={`px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'jobs' ? 'bg-teal-400 text-navy-900' : 'text-slate-400 hover:text-white'}`}
                >
                    Operations
                </button>
                <button 
                    onClick={() => setActiveTab('safety')}
                    className={`px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'safety' ? 'bg-teal-400 text-navy-900' : 'text-slate-400 hover:text-white'}`}
                >
                    Safety
                </button>
                <button 
                    onClick={() => setActiveTab('ai_studio')}
                    className={`px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${activeTab === 'ai_studio' ? 'bg-teal-400 text-navy-900' : 'text-slate-400 hover:text-white'}`}
                >
                    <Sparkles size={14} /> AI Studio
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-12">
        
        {/* DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-2 block">Today: {simulatedDate}</span>
                        <h2 className="text-4xl font-display font-black uppercase text-white">Daily <span className="text-slate-500">Briefing</span></h2>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold rounded-sm transition-colors text-sm shadow-lg shadow-blue-900/20">
                        <Facebook size={18} />
                        Launch Meta Suite
                    </button>
                </div>

                {/* Today's Task Card */}
                {todayPost ? (
                    <div className="bg-navy-900 border-l-4 border-teal-400 rounded-r-lg shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-white/5">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-teal-400/10 text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-400/20">
                                    {todayPost.category}
                                </span>
                                <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                                    Goal: {todayPost.cta}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <label className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Caption</label>
                                        <div className="bg-navy-950 p-4 rounded-sm border border-white/5 text-slate-200 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                            {todayPost.content.caption}
                                            <div className="mt-4 text-teal-400">
                                                {todayPost.content.hashtags.join(' ')}
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(todayPost.content.caption + '\n\n' + todayPost.content.hashtags.join(' '))}
                                        className="w-full bg-teal-400 hover:bg-teal-300 text-navy-900 font-bold py-4 uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Copy size={20} /> Copy Caption
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-navy-950 p-4 rounded-sm border border-white/5 h-full flex flex-col justify-center text-center">
                                        <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 text-teal-400">
                                            <ImageIcon size={32} />
                                        </div>
                                        <h4 className="text-white font-bold uppercase text-sm mb-2">Visual Brief</h4>
                                        <p className="text-slate-400 text-xs italic">
                                            "{todayPost.visual_brief}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 bg-navy-900 text-center rounded-lg border border-white/5">
                        <h3 className="text-xl font-bold text-white">No content scheduled for today.</h3>
                    </div>
                )}

                {/* Next Up */}
                {nextPost && (
                    <div className="opacity-60 hover:opacity-100 transition-opacity">
                        <h4 className="text-slate-500 font-bold uppercase tracking-widest mb-4 text-sm">On Deck: Tomorrow</h4>
                        <div className="bg-navy-900 p-6 rounded-lg border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-navy-950 rounded-lg text-slate-400">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">{nextPost.category}</p>
                                    <p className="text-slate-500 text-sm">Visual: {nextPost.visual_brief}</p>
                                </div>
                            </div>
                            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">{nextPost.cta}</span>
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* CALENDAR VIEW */}
        {activeTab === 'calendar' && (
            <>
                 {/* Stats / Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-teal-500/20">
                            <LayoutGrid size={14} />
                            Full Schedule
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-white">
                            Content <span className="text-slate-600">Calendar</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            {posts.length} Scheduled
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="bg-navy-900 border border-white/5 hover:border-teal-400/30 rounded-sm overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col">
                            {/* Card Header */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-navy-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center border border-white/10 text-teal-400">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">{post.date}</p>
                                        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">{post.day}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border flex items-center gap-1 ${post.date < simulatedDate ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                    <Clock size={10} />
                                    {post.date < simulatedDate ? 'Posted' : post.status}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-6 flex-grow">
                                {/* Category */}
                                <div className="flex justify-between items-start">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Strategy</span>
                                    <span className="text-white text-xs font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded-sm">{post.category}</span>
                                </div>

                                {/* Caption Preview */}
                                <div className="space-y-2">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                        <MessageSquare size={12} /> Caption
                                    </span>
                                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap line-clamp-4 font-light border-l-2 border-teal-400/50 pl-3">
                                        {post.content.caption}
                                    </p>
                                </div>

                                {/* Visual Brief */}
                                <div className="bg-navy-950/50 p-4 rounded-sm border border-white/5 space-y-2">
                                    <span className="text-teal-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                        <ImageIcon size={12} /> Visual Brief
                                    </span>
                                    <p className="text-white text-sm italic opacity-80">
                                        "{post.visual_brief}"
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-6 border-t border-white/5 bg-navy-950/30 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {post.content.hashtags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                                        Goal: <span className="text-white">{post.cta}</span>
                                    </div>
                                    <button className="text-slate-400 hover:text-white transition-colors">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredPosts.length === 0 && (
                        <div className="col-span-full p-12 text-center text-slate-500 border border-white/5 bg-navy-900 rounded-sm">
                            No posts found matching your search.
                        </div>
                    )}
                </div>
            </>
        )}

        {/* LEADS VIEW */}
        {activeTab === 'leads' && (
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-2 block">Incoming Pipeline</span>
                        <h2 className="text-4xl font-display font-black uppercase text-white">Active <span className="text-slate-500">Leads</span></h2>
                    </div>
                </div>

                <div className="bg-navy-900 rounded-sm border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-navy-950 border-b border-white/5">
                                    <th className="p-6 text-slate-400 font-bold uppercase text-xs tracking-widest">Status</th>
                                    <th className="p-6 text-slate-400 font-bold uppercase text-xs tracking-widest">Customer</th>
                                    <th className="p-6 text-slate-400 font-bold uppercase text-xs tracking-widest">Project</th>
                                    <th className="p-6 text-slate-400 font-bold uppercase text-xs tracking-widest">Urgency</th>
                                    <th className="p-6 text-slate-400 font-bold uppercase text-xs tracking-widest">Source</th>
                                    <th className="p-6 text-slate-400 font-bold uppercase text-xs tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.lead_id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                                                lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                                                lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                                                'bg-slate-700 text-slate-300'
                                            }`}>
                                                {lead.status === 'new' && <AlertCircle size={12} />}
                                                {lead.status === 'contacted' && <CheckCircle size={12} />}
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{lead.customer.name}</div>
                                            <div className="text-slate-500 text-sm flex items-center gap-1">
                                                <Phone size={12} /> {lead.customer.phone}
                                            </div>
                                            <div className="text-slate-500 text-sm flex items-center gap-1">
                                                <MapPin size={12} /> {lead.customer.address}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-white font-bold capitalize">{lead.project_details.type.replace('_', ' ')}</div>
                                            <div className="text-slate-500 text-xs max-w-xs truncate">{lead.project_details.notes}</div>
                                        </td>
                                        <td className="p-6">
                                             <span className={`text-xs font-bold uppercase tracking-widest ${
                                                lead.project_details.urgency === 'high' ? 'text-red-400' : 
                                                lead.project_details.urgency === 'medium' ? 'text-yellow-400' : 
                                                'text-slate-400'
                                             }`}>
                                                {lead.project_details.urgency}
                                             </span>
                                        </td>
                                        <td className="p-6 text-slate-400 text-sm capitalize">
                                            {lead.source.replace('_', ' ')}
                                        </td>
                                        <td className="p-6 text-slate-400 text-sm font-mono">
                                            {lead.timestamp.split(' ')[0]}
                                        </td>
                                    </tr>
                                ))}
                                {filteredLeads.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-slate-500">
                                            No leads found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

         {/* OPERATIONS / JOB JACKET VIEW */}
         {activeTab === 'jobs' && (
            <div className="max-w-6xl mx-auto">
                 <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-2 block">Site Management</span>
                        <h2 className="text-4xl font-display font-black uppercase text-white">Active <span className="text-slate-500">Job Jackets</span></h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List of Jobs */}
                    <div className="lg:col-span-1 space-y-4">
                        {filteredContracts.map(contract => (
                            <div 
                                key={contract.id} 
                                onClick={() => { setSelectedContract(contract); setUploadedPhotos([]); setUploadStatus(''); }}
                                className={`p-6 rounded-sm border cursor-pointer transition-all duration-300 ${selectedContract?.id === contract.id ? 'bg-navy-800 border-teal-400' : 'bg-navy-900 border-white/5 hover:border-teal-400/50'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-slate-500">{contract.id}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${contract.status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                        {contract.status}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{contract.clientName}</h3>
                                <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                                    <MapPin size={12} /> {contract.address}
                                </div>
                            </div>
                        ))}
                        {filteredContracts.length === 0 && (
                             <div className="p-6 text-center text-slate-500 border border-white/5 bg-navy-900 rounded-sm">
                                No active jobs found.
                            </div>
                        )}
                    </div>

                    {/* Job Jacket Detail */}
                    <div className="lg:col-span-2">
                        {selectedContract ? (
                            <div className="bg-navy-900 border border-white/5 rounded-sm p-8">
                                <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/5">
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-white mb-2">Job Jacket: #{selectedContract.id}</h2>
                                        <p className="text-slate-400 flex items-center gap-2">
                                            <Briefcase size={16} /> {selectedContract.clientName} - {selectedContract.address}
                                        </p>
                                    </div>
                                    {selectedContract.status === 'paid' && (
                                        <button 
                                            onClick={() => setShowWarranty(true)}
                                            className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold px-6 py-2 rounded-sm flex items-center gap-2 transition-colors uppercase tracking-wider text-sm shadow-lg shadow-teal-500/20"
                                        >
                                            <Award size={18} /> Issue Warranty
                                        </button>
                                    )}
                                </div>

                                {/* Evidence Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Camera className="text-teal-400" size={20} />
                                        <h3 className="font-bold text-white uppercase tracking-wider">Site Evidence</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button 
                                            onClick={() => setEvidenceCategory('before')}
                                            className={`p-3 rounded-sm border text-sm font-bold uppercase tracking-wider transition-colors ${evidenceCategory === 'before' ? 'bg-teal-400 text-navy-900 border-teal-400' : 'bg-navy-950 text-slate-400 border-white/10 hover:border-white/30'}`}
                                        >
                                            1. Pre-Existing
                                        </button>
                                        <button 
                                            onClick={() => setEvidenceCategory('during')}
                                            className={`p-3 rounded-sm border text-sm font-bold uppercase tracking-wider transition-colors ${evidenceCategory === 'during' ? 'bg-teal-400 text-navy-900 border-teal-400' : 'bg-navy-950 text-slate-400 border-white/10 hover:border-white/30'}`}
                                        >
                                            2. In Progress
                                        </button>
                                        <button 
                                            onClick={() => setEvidenceCategory('after')}
                                            className={`p-3 rounded-sm border text-sm font-bold uppercase tracking-wider transition-colors ${evidenceCategory === 'after' ? 'bg-teal-400 text-navy-900 border-teal-400' : 'bg-navy-950 text-slate-400 border-white/10 hover:border-white/30'}`}
                                        >
                                            3. Completion
                                        </button>
                                    </div>

                                    <div className="border-2 border-dashed border-white/10 rounded-lg p-12 text-center hover:bg-white/5 transition-colors cursor-pointer relative group">
                                        <input 
                                            type="file" 
                                            multiple 
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileUpload}
                                        />
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-navy-950 rounded-full flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                                                <UploadCloud size={32} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg">Tap to Snap or Upload</p>
                                                <p className="text-slate-500 text-sm">JPG, PNG supported</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status / Previews */}
                                    {isUploading && (
                                        <div className="text-center text-teal-400 animate-pulse font-mono text-sm">
                                            {uploadStatus}
                                        </div>
                                    )}

                                    {uploadedPhotos.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-6">
                                            {uploadedPhotos.map((url, idx) => (
                                                <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-white/10 relative group">
                                                    <img src={url} alt="Evidence" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <CheckCircle className="text-green-400" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button 
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={uploadedPhotos.length === 0}
                                        onClick={() => { setUploadedPhotos([]); setUploadStatus(''); alert('Evidence Secured in Cloud Storage'); }}
                                    >
                                        <UploadCloud size={20} /> Save to Cloud
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-navy-900 border border-white/5 rounded-sm p-12 text-center h-full flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center text-slate-500 mb-6">
                                    <Briefcase size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Select a Job</h3>
                                <p className="text-slate-400 max-w-sm mx-auto">Choose an active contract from the list to manage evidence or issue certificates.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
         )}
         
        {/* SAFETY / GUARDIAN VIEW */}
        {activeTab === 'safety' && (
            <div className="max-w-6xl mx-auto">
                 <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-2 block">PROS | Guardian Engine</span>
                        <h2 className="text-4xl font-display font-black uppercase text-white">Safety <span className="text-slate-500">Compliance</span></h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* List of Jobs to Report On */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select Active Site</h3>
                        {filteredContracts.filter(c => c.status === 'active').map(contract => (
                            <div 
                                key={contract.id} 
                                onClick={() => generateDSR(contract)}
                                className={`p-6 rounded-sm border cursor-pointer transition-all duration-300 ${safetyContract?.id === contract.id ? 'bg-navy-800 border-teal-400' : 'bg-navy-900 border-white/5 hover:border-teal-400/50'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-slate-500">{contract.id}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{contract.clientName}</h3>
                                <div className="flex items-center gap-1 text-slate-400 text-xs">
                                    <MapPin size={12} /> {contract.address}
                                </div>
                            </div>
                        ))}
                        {filteredContracts.filter(c => c.status === 'active').length === 0 && (
                            <div className="p-6 text-center text-slate-500 border border-white/5 bg-navy-900 rounded-sm">
                                No active sites found.
                            </div>
                        )}
                    </div>

                    {/* Digital DSR HUD */}
                    <div className="lg:col-span-2">
                        {safetyRecord ? (
                            <div className="bg-[#121E33] border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl animate-fade-in-up">
                                {/* HUD Header */}
                                <div className="bg-navy-950 p-6 border-b border-slate-800 flex justify-between items-center">
                                    <div>
                                        <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                                            GUARDIAN <span className="text-teal-400">DSR</span>
                                        </h1>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Daily Safety Record | Quispamsis Grid</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-green-500 font-bold text-sm flex items-center gap-1 justify-end">
                                            <ShieldCheck size={16} /> COMPLIANT
                                        </div>
                                        <div className="text-[10px] text-slate-500">{safetyRecord.date}</div>
                                    </div>
                                </div>

                                {/* HUD Body */}
                                <div className="p-8">
                                    {/* Location Info */}
                                    <div className="mb-8">
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Jobsite Location</h3>
                                        <p className="text-xl font-bold text-white font-mono">{safetyContract?.address.toUpperCase()}</p>
                                    </div>

                                    {/* Weather Data */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-navy-900/50 p-4 rounded-sm border border-white/5 flex items-center gap-4">
                                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-full">
                                                <ThermometerSnowflake size={24} />
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 font-bold uppercase block">Temp</span>
                                                <span className="text-xl font-bold text-white">{safetyRecord.temperature}°C</span>
                                            </div>
                                        </div>
                                        <div className="bg-navy-900/50 p-4 rounded-sm border border-white/5 flex items-center gap-4">
                                            <div className="p-3 bg-slate-500/10 text-slate-400 rounded-full">
                                                <Wind size={24} />
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 font-bold uppercase block">Wind</span>
                                                <span className="text-xl font-bold text-white">{safetyRecord.windSpeed} km/h</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hazard Analysis */}
                                    <div className="mb-8">
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Active Hazard Analysis</h3>
                                        <div className="space-y-3">
                                            {safetyRecord.hazards.map((hazard, idx) => (
                                                <div key={idx} className="border-l-4 border-yellow-500 bg-yellow-500/5 p-4 rounded-r-sm flex items-center gap-3">
                                                    <AlertTriangle size={16} className="text-yellow-500" />
                                                    <p className="text-sm font-bold text-yellow-500 italic uppercase">{hazard}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* PPE & Verification */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">PPE Verification</h3>
                                            <ul className="space-y-3">
                                                {safetyRecord.ppe.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                                        <div className="text-green-500"><CheckCircle size={14} /></div>
                                                        <span className="flex items-center gap-2"><HardHat size={14} className="text-slate-600"/> {item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="border-l border-slate-700 pl-6 flex flex-col justify-center">
                                            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">Crew Affirmation</h3>
                                            <p className="text-xs text-slate-400 leading-relaxed italic">
                                                "By commencing work, the crew affirms they have reviewed the hazards listed above and inspected all fall-arrest equipment for defects."
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-slate-800/50">
                                                <p className="text-[10px] text-slate-500 uppercase font-bold">Foreman Signature: <span className="text-white font-mono">PAUL SCHULZ</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer / Actions */}
                                    <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-end">
                                        <div className="text-[10px] text-slate-600 font-mono">
                                            System Auth: PROS-V1-GUARDIAN<br />
                                            Logging to: Harper's Key Evidence Locker
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => window.print()} className="bg-navy-800 hover:bg-navy-700 text-slate-300 px-4 py-2 rounded-sm font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2">
                                                <Printer size={14} /> Print Brief
                                            </button>
                                            <button 
                                                onClick={() => { alert('Safety Record Archived to Secure Storage.'); setSafetyRecord(null); setSafetyContract(null); }}
                                                className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-sm font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-teal-900/20"
                                            >
                                                <FileCheck size={14} /> Archive Record
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                             <div className="bg-navy-900 border border-white/5 rounded-sm p-12 text-center h-full flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center text-slate-500 mb-6">
                                    <ShieldCheck size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Initialize Compliance</h3>
                                <p className="text-slate-400 max-w-sm mx-auto">Select an active site to generate a Guardian Daily Safety Record.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* AI STUDIO VIEW */}
        {activeTab === 'ai_studio' && (
             <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-2 block">Enterprise Intelligence</span>
                        <h2 className="text-4xl font-display font-black uppercase text-white">AI <span className="text-slate-500">Studio</span></h2>
                    </div>
                </div>

                {!aiTool ? (
                    <div className="space-y-16">
                        {toolCategories.map((category, idx) => (
                            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                                    <category.icon className="text-teal-400" size={24} />
                                    {category.title}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.tools.map(tool => (
                                        <div 
                                            key={tool.id} 
                                            onClick={() => { setAiTool(tool.id); setPrompt(''); setResponse(''); setGeneratedMedia(null); setMediaData(null); }}
                                            className="bg-navy-900 border border-white/5 hover:border-teal-400/50 p-6 rounded-sm cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-navy-800 rounded-lg text-teal-400 group-hover:bg-teal-400 group-hover:text-navy-900 transition-colors">
                                                    <tool.icon size={24} />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{tool.name}</h3>
                                            <p className="text-slate-400 text-sm mb-4 flex-grow">{tool.desc}</p>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-navy-950 inline-block px-2 py-1 rounded-sm border border-white/5 self-start">
                                                {tool.model}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-navy-900 border border-white/5 rounded-sm p-8 min-h-[600px] flex flex-col">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                            <button onClick={() => setAiTool(null)} className="p-2 hover:bg-navy-800 rounded-full text-slate-400 hover:text-white transition-colors">
                                <ArrowLeft size={24} />
                            </button>
                            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                                {aiTool === 'editor' && 'Nano Editor'}
                                {aiTool === 'generator' && 'Visualizer Pro'}
                                {aiTool === 'maps' && 'Site Scout'}
                                {aiTool === 'search' && 'Market Intel'}
                                {aiTool === 'video' && 'Veo Studio'}
                                {aiTool === 'analyzer' && 'Damage Inspector'}
                                {aiTool === 'fast' && 'Quick Chat'}
                                {aiTool === 'thinking' && 'Strategy Engine'}
                                {aiTool === 'audio' && 'Voice Memo'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
                            <div className="space-y-6">
                                {/* Inputs based on tool type */}
                                {(aiTool === 'editor' || aiTool === 'analyzer') && (
                                     <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:bg-white/5 transition-colors relative">
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAIMediaUpload} />
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <UploadCloud size={32} />
                                            <span className="text-xs font-bold uppercase tracking-widest">{mediaData ? 'Image Uploaded' : 'Upload Image'}</span>
                                        </div>
                                    </div>
                                )}

                                {aiTool === 'audio' && (
                                    <div className="flex items-center justify-center gap-4 p-8 border border-white/10 bg-navy-950 rounded-lg">
                                        {!isRecording ? (
                                            <button onClick={startRecording} className="flex flex-col items-center gap-2 text-red-500 hover:text-red-400">
                                                <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center">
                                                    <Mic size={32} />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">Record</span>
                                            </button>
                                        ) : (
                                             <button onClick={stopRecording} className="flex flex-col items-center gap-2 text-white animate-pulse">
                                                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                                                    <StopCircle size={32} />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">Stop</span>
                                            </button>
                                        )}
                                        {mediaData && mediaType?.startsWith('audio') && (
                                            <div className="text-green-500 text-xs font-bold uppercase tracking-widest">Audio Captured</div>
                                        )}
                                    </div>
                                )}

                                {aiTool === 'generator' && (
                                    <div>
                                        <label className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Image Size</label>
                                        <div className="flex gap-2">
                                            {['1K', '2K', '4K'].map(size => (
                                                <button 
                                                    key={size}
                                                    onClick={() => setImageSize(size as any)}
                                                    className={`flex-1 py-2 text-sm font-bold border ${imageSize === size ? 'bg-teal-400 text-navy-900 border-teal-400' : 'bg-navy-950 text-slate-400 border-white/10'}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {aiTool === 'video' && (
                                    <div>
                                        <label className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Aspect Ratio</label>
                                        <div className="flex gap-2">
                                            {['16:9', '9:16'].map(ratio => (
                                                <button 
                                                    key={ratio}
                                                    onClick={() => setVideoRatio(ratio as any)}
                                                    className={`flex-1 py-2 text-sm font-bold border ${videoRatio === ratio ? 'bg-teal-400 text-navy-900 border-teal-400' : 'bg-navy-950 text-slate-400 border-white/10'}`}
                                                >
                                                    {ratio}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {aiTool !== 'audio' && (
                                    <div>
                                        <label className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">Prompt</label>
                                        <textarea 
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder={
                                                aiTool === 'editor' ? "Add a retro filter..." :
                                                aiTool === 'generator' ? "A modern house with a black metal roof..." :
                                                aiTool === 'maps' ? "Find roofing suppliers near Quispamsis..." :
                                                "Enter your command..."
                                            }
                                            className="w-full h-32 bg-navy-950 border border-white/10 p-4 text-white placeholder-slate-600 focus:border-teal-400 focus:outline-none resize-none rounded-sm"
                                        />
                                    </div>
                                )}

                                <button 
                                    onClick={runAI}
                                    disabled={isLoading}
                                    className="w-full bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold py-4 uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} /> Generate Output
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="bg-navy-950 border border-white/10 rounded-sm p-6 relative min-h-[400px]">
                                <span className="absolute top-4 right-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Output Console</span>
                                
                                {response && (
                                    <div className="prose prose-invert max-w-none">
                                        <p className="whitespace-pre-wrap text-slate-300 font-light leading-relaxed">{response}</p>
                                    </div>
                                )}

                                {generatedMedia && (
                                    <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                                        {aiTool === 'video' ? (
                                            <video src={generatedMedia} controls className="w-full" />
                                        ) : (
                                            <img src={generatedMedia} alt="AI Generated" className="w-full object-cover" />
                                        )}
                                    </div>
                                )}
                                
                                {!response && !generatedMedia && !isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                                        <p className="text-sm font-mono">Waiting for input...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
             </div>
        )}

      </div>

      {/* Warranty Certificate Modal */}
      {showWarranty && selectedContract && (
        <div className="fixed inset-0 z-[100] bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white text-navy-900 max-w-3xl w-full p-12 relative shadow-2xl rounded-sm overflow-hidden animate-fade-in-up">
                <button 
                    onClick={() => setShowWarranty(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                    <X size={32} />
                </button>

                <div className="text-center border-[10px] border-double border-navy-100 p-8 outline outline-1 outline-navy-200">
                    <div className="flex justify-center mb-6">
                         <div className="w-24 h-24 bg-navy-900 rounded-lg flex items-center justify-center">
                            <img 
                                src="https://i.ibb.co/LDv0vx9b/39316-D9-E-DCC0-4-BCC-8-BB4-A52-FAF0-C2-BCB.png" 
                                alt="Logo" 
                                className="w-20"
                            />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-2">CERTIFICATE OF WARRANTY</h1>
                    <div className="w-32 h-1 bg-teal-500 mx-auto mb-8"></div>

                    <p className="text-lg text-slate-600 font-serif italic mb-6">This certifies that the roofing system installed at:</p>
                    
                    <h3 className="text-3xl font-bold text-navy-900 mb-6 font-display uppercase tracking-wider">{selectedContract.address}</h3>
                    
                    <p className="text-slate-600 font-serif mb-8 max-w-xl mx-auto">
                        Has been completed by Paul's Roofing in accordance with manufacturer specifications and is guaranteed against defects in workmanship.
                    </p>

                    <div className="bg-slate-50 p-6 border border-slate-200 inline-block rounded-sm mb-8">
                        <div className="grid grid-cols-2 gap-12 text-left">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client Name</p>
                                <p className="font-bold text-lg">{selectedContract.clientName}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Warranty Period</p>
                                <p className="font-bold text-lg text-teal-600">10 YEARS</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Issue Date</p>
                                <p className="font-bold">{getWarrantyDate()}</p>
                            </div>
                             <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Valid Until</p>
                                <p className="font-bold">{getExpirationDate()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-end gap-2 mb-8">
                         <div className="text-center">
                            <div className="font-signature text-3xl text-navy-900 mb-2" style={{fontFamily: 'cursive'}}>Paul Roofs</div>
                            <div className="w-64 h-px bg-navy-900"></div>
                            <p className="text-xs font-bold uppercase tracking-widest mt-2 text-slate-500">Authorized Signature</p>
                         </div>
                         <div className="mb-2">
                             <ShieldCheck size={48} className="text-teal-500" />
                         </div>
                    </div>

                    <p className="text-slate-400 text-sm font-serif italic">"We stand behind our work, through rain, wind, and snow."</p>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button 
                        onClick={() => window.print()}
                        className="bg-navy-900 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-teal-500 transition-colors flex items-center gap-2"
                    >
                        <Printer size={20} /> Print Certificate
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};