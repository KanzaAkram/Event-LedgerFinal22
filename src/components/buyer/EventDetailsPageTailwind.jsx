// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   CiImageOn,
//   CiCalendar,
//   CiClock2,
//   CiLocationOn,
//   CiUser,
//   CiBookmark,
//   CiFolderOn,
//   CiFilter,
//   CiMaximize1,
//   CiZoomIn,
//   CiZoomOut,
// } from "react-icons/ci";
// import { IoLocationSharp } from "react-icons/io5";
// import { ethers } from "ethers";
// import { QRCodeSVG } from "qrcode.react";

// const CONTRACT_ADDRESS = "0xA58f8f070471A67B48Bb760Cf936B2C085bD591E";

// const TicketContractABI = [
//   {
//     "inputs": [],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "buyer",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "ticketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "ticketType",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "price",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "eventId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "nftMetadataUri",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "qrCodeMetadata",
//         "type": "string"
//       }
//     ],
//     "name": "TicketPurchased",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "ticketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "bool",
//         "name": "isValid",
//         "type": "bool"
//       }
//     ],
//     "name": "TicketVerified",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_eventId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "_ticketType",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_nftMetadataUri",
//         "type": "string"
//       }
//     ],
//     "name": "buyTicket",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_ticketType",
//         "type": "string"
//       }
//     ],
//     "name": "getTicketPrice",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "pure",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_ticketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "_transactionHash",
//         "type": "string"
//       }
//     ],
//     "name": "setTransactionHash",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_ticketId",
//         "type": "uint256"
//       }
//     ],
//     "name": "verifyTicket",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "withdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "admin",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "ticketCounter",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "tickets",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "ticketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "eventId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "ticketType",
//         "type": "string"
//       },
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "internalType": "string",
//         "name": "nftMetadataUri",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "transactionHash",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "price",
//         "type": "uint256"
//       },
//       {
//         "internalType": "bool",
//         "name": "isVerified",
//         "type": "bool"
//       },
//       {
//         "internalType": "uint256",
//         "name": "purchasedAt",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "qrCodeMetadata",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// const EventDetailsPageTailwind = () => {
//   const { eventId } = useParams();
//   const [eventData, setEventData] = useState(null);
//   const [hostData, setHostData] = useState({ name: "", imageUrl: null });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ticketQuantity, setTicketQuantity] = useState(1);
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [purchasedTickets, setPurchasedTickets] = useState([]);

//   const API_BASE_URL = "http://localhost:5000";
//   const QR_CODE_BASE_URL = "http://localhost:3000/ticket/verify";

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         setLoading(true);
//         console.log("Fetching event with ID:", eventId);
//         const response = await fetch(`${API_BASE_URL}/api/detailsEvents/${eventId}`);
//         if (!response.ok) throw new Error(`Failed to fetch event data: ${response.statusText}`);
//         const data = await response.json();
//         console.log("API response:", data);

//         const event = data.event || data;
//         if (!event.ticketPriceETH || isNaN(event.ticketPriceETH) || event.ticketPriceETH <= 0) {
//           console.warn(
//             "Event data missing or invalid ticketPriceETH, setting default based on ticketType:",
//             event
//           );
//           event.ticketPriceETH = event.ticketType === "General Admission" ? 0.05 : 0.1;
//         }
//         if (!event.ticketType) {
//           console.warn("Event data missing ticketType, setting default:", event);
//           event.ticketType = "General Admission";
//         }
//         setEventData(event);

//         try {
//           const hostResponse = await fetch(`${API_BASE_URL}/api/hosts/${event.hostId}`);
//           if (!hostResponse.ok) throw new Error("Failed to fetch host data");
//           const hostData = await hostResponse.json();
//           setHostData({
//             name: hostData.user?.name || "Unknown Host",
//             imageUrl: hostData.user?.imageUrl || null,
//           });
//         } catch (hostErr) {
//           console.error("Host fetch error:", hostErr.message);
//           setHostData({ name: "Unknown Host", imageUrl: null });
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEventData();
//   }, [eventId]);

//   const nextImage = () => {
//     if (eventData?.images?.length) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === eventData.images.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (eventData?.images?.length) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === 0 ? eventData.images.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   const closeAlert = () => {
//     setIsAlertOpen(false);
//     setTicketQuantity(1);
//     setPurchasedTickets([]);
//   };

//   const saveTicketToMongoDB = async (ticketData) => {
//     const requiredFields = [
//       "ticketId",
//       "eventId",
//       "ticketType",
//       "owner",
//       "nftMetadataUri",
//       "transactionHash",
//       "price",
//       "purchasedAt",
//     ];
//     for (const field of requiredFields) {
//       if (!ticketData[field]) {
//         console.error(`Missing required field: ${field}`);
//         throw new Error(`Failed to save ticket: Missing ${field}`);
//       }
//     }

//     if (!ethers.isAddress(ticketData.owner)) {
//       console.error("Invalid owner address:", ticketData.owner);
//       throw new Error("Failed to save ticket: Invalid owner address");
//     }

//     const qrCodeUrl = `${QR_CODE_BASE_URL}/${ticketData.ticketId}`;
//     const ticketDataWithQr = {
//       ...ticketData,
//       qrCodeMetadata: qrCodeUrl,
//       isUsed: false,
//     };

//     const maxRetries = 3;
//     const delay = 1000;
//     for (let attempt = 1; attempt <= maxRetries; attempt++) {
//       try {
//         console.log(`Saving ticket metadata (Attempt ${attempt}):`, ticketDataWithQr);
//         const response = await fetch(`${API_BASE_URL}/api/ticketMetadata`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(ticketDataWithQr),
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to save ticket metadata: ${errorText || response.statusText}`);
//         }

//         const result = await response.json();
//         console.log("Ticket metadata saved:", result);
//         return { ...result, qrCodeUrl };
//       } catch (err) {
//         console.error(`Attempt ${attempt} failed:`, err.message);
//         if (attempt === maxRetries) {
//           throw new Error(`Failed to save ticket after ${maxRetries} attempts: ${err.message}`);
//         }
//         await new Promise((resolve) => setTimeout(resolve, delay * attempt));
//       }
//     }
//   };

//   const handleBuyTickets = async () => {
//     if (!eventData) {
//       alert("Event data not available. Please try again later.");
//       return;
//     }

//     console.log("Event data in handleBuyTickets:", eventData);
//     const ticketPrice = eventData.ticketPriceETH;
//     const newPurchasedTickets = [];

//     try {
//       for (let i = 0; i < ticketQuantity; i++) {
//         const result = await purchaseTicketsOnBlockchain(ticketPrice);
//         if (result && result.tx && result.ticketId) {
//           const savedTicket = await saveTicketToMongoDB({
//             ticketId: result.ticketId,
//             eventId: eventData._id,
//             ticketType: eventData.ticketType,
//             owner: result.tx.from,
//             nftMetadataUri: result.nftMetadataUri,
//             transactionHash: result.tx.hash,
//             price: ticketPrice,
//             purchasedAt: Math.floor(Date.now() / 1000),
//           });
//           newPurchasedTickets.push({
//             ticketId: result.ticketId,
//             qrCodeUrl: savedTicket.qrCodeUrl,
//           });
//         } else {
//           console.warn(`Transaction ${i + 1} failed.`);
//           alert(`Failed to purchase ticket ${i + 1}. Stopping purchase.`);
//           break;
//         }
//       }

//       if (newPurchasedTickets.length > 0) {
//         setPurchasedTickets(newPurchasedTickets);
//         setIsAlertOpen(true);
//         closeModal();
//       } else {
//         alert("No tickets were purchased. Please check your wallet balance and try again.");
//       }
//     } catch (err) {
//       console.error("Purchase error:", err);
//       alert(`Purchase failed: ${err.message}`);
//     }
//   };

//   const purchaseTicketsOnBlockchain = async (ticketPrice) => {
//     if (!window.ethereum) {
//       alert("Please install MetaMask to continue.");
//       return null;
//     }

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const walletAddress = await signer.getAddress();
//       const balance = await provider.getBalance(walletAddress);
//       const requiredEth = ethers.parseEther((ticketPrice + 0.01).toString());
//       console.log("Wallet balance check:", {
//         balance: ethers.formatEther(balance),
//         required: ticketPrice + 0.01,
//       });
//       if (balance < requiredEth) {
//         alert(
//           `Insufficient funds. Need ${ticketPrice + 0.01} ETH (including gas). Current balance: ${ethers.formatEther(balance)} ETH.`
//         );
//         return null;
//       }

//       const nftMetadataUri = "ipfs://bafkreibpdgwh5beu3iwdm3ml6ox4y35dozmexrdo34vl4rwy6s36ydfthq";
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, signer);

//       const parsedEventId = parseInt(eventData._id, 16);
//       if (isNaN(parsedEventId) || parsedEventId <= 0) {
//         console.error("Invalid event ID:", eventData._id);
//         alert("Invalid event ID. Please contact support.");
//         return null;
//       }

//       if (!eventData.ticketType) {
//         console.error("Ticket type is undefined:", eventData);
//         alert("Ticket type unavailable. Please contact support.");
//         return null;
//       }

//       console.log("Calling buyTicket:", {
//         parsedEventId,
//         ticketType: eventData.ticketType,
//         nftMetadataUri,
//         value: ethers.parseEther(ticketPrice.toString()).toString(),
//       });

//       const tx = await contract.buyTicket(parsedEventId, eventData.ticketType, nftMetadataUri, {
//         value: ethers.parseEther(ticketPrice.toString()),
//         gasLimit: 300000,
//       });

//       const receipt = await tx.wait();
//       const ticketIdEvent = receipt.logs
//         .filter((log) => log.address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase())
//         .map((log) => {
//           try {
//             return contract.interface.parseLog(log);
//           } catch (e) {
//             return null;
//           }
//         })
//         .find((event) => event && event.name === "TicketPurchased");

//       const ticketId = ticketIdEvent ? ticketIdEvent.args.ticketId.toNumber() : null;
//       if (!ticketId) {
//         console.error("Failed to parse TicketPurchased event:", receipt.logs);
//         alert("Transaction succeeded, but ticket ID could not be retrieved.");
//         return { tx, ticketId: null, nftMetadataUri };
//       }

//       console.log("Transaction successful:", tx.hash, "Ticket ID:", ticketId);
//       return { tx, ticketId, nftMetadataUri };
//     } catch (err) {
//       console.error("Smart contract error:", {
//         message: err.message,
//         reason: err.reason,
//         code: err.code,
//         data: err.data,
//       });
//       alert(`Transaction failed: ${err.reason || err.message || "Unknown error"}`);
//       return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
//         <p className="text-white text-xl">Loading event details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
//         <p className="text-pink-400 text-xl">Error: {error}</p>
//       </div>
//     );
//   }

//   if (!eventData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
//         <p className="text-white text-xl">Event not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 px-5 py-10 flex justify-center items-start font-sans">
//       <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 max-w-4xl w-full text-gray-300">
//         <div className="relative bg-gray-800 h-[200px] md:h-[300px] rounded-lg mb-8 overflow-hidden">
//           {eventData.images?.length > 0 ? (
//             <>
//               <img
//                 src={eventData.images[currentImageIndex].url}
//                 alt={`${eventData.eventTitle} ${currentImageIndex + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 onClick={prevImage}
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 border border-white/30 rounded-full size-10 flex items-center justify-center text-white transition-colors"
//               >
//                 ←
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 border border-white/30 rounded-full size-10 flex items-center justify-center text-white transition-colors"
//               >
//                 →
//               </button>
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//                 {eventData.images.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`size-3 rounded-full ${
//                       currentImageIndex === index ? "bg-white" : "bg-gray-500"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </>
//           ) : (
//             <CiImageOn className="text-6xl text-gray-500" />
//           )}
//         </div>

//         <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
//           {eventData.eventTitle}
//         </h1>

//         <div className="mb-8 bg-gray-900/50 border border-white/20 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-gray-900/70 transition-colors duration-300">
//           <div className="flex items-center gap-2">
//             <CiFolderOn className="text-pink-500 text-xl flex-shrink-0" />
//             <p className="text-base">
//               <span className="font-semibold bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
//                 Category:
//               </span>{" "}
//               <span className="text-gray-300">{eventData.category}</span>
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <CiFilter className="text-pink-500 text-xl flex-shrink-0" />
//             <p className="text-base">
//               <span className="font-semibold bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
//                 Type:
//               </span>{" "}
//               <span className="text-gray-300">{eventData.eventType}</span>
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-8 md:gap-10 mb-8">
//           <div className="flex-1 md:flex-[2] min-w-0">
//             <div className="mb-8">
//               <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
//                 Date and Time
//               </h2>
//               <p className="flex items-center mb-2.5 text-base text-gray-400">
//                 <CiCalendar className="mr-3 text-pink-500 text-xl flex-shrink-0" />{" "}
//                 {new Date(eventData.startDate).toLocaleDateString()}
//               </p>
//               <p className="flex items-center mb-2.5 text-base text-gray-400">
//                 <CiClock2 className="mr-3 text-pink-500 text-xl flex-shrink-0" />{" "}
//                 {eventData.startTime} - {eventData.endTime}
//               </p>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
//                 Location
//               </h2>
//               <p className="flex items-start mb-2.5 text-base text-gray-400">
//                 <CiLocationOn className="mr-3 text-pink-500 text-xl mt-1 flex-shrink-0" />
//                 <span>
//                   {eventData.eventType === "virtual"
//                     ? "Virtual Event"
//                     : eventData.location}
//                 </span>
//               </p>
//               <div className="bg-gray-900 h-[200px] rounded-md mt-4 relative flex items-center justify-center overflow-hidden">
//                 <IoLocationSharp className="text-pink-500 text-5xl" />
//                 <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
//                   <button className="bg-black/60 hover:bg-black/80 border border-white/30 rounded size-8 flex items-center justify-center text-white text-xs transition-colors">
//                     <CiZoomIn size={18} />
//                   </button>
//                   <button className="bg-black/60 hover:bg-black/80 border border-white/30 rounded size-8 flex items-center justify-center text-white text-xs transition-colors">
//                     <CiZoomOut size={18} />
//                   </button>
//                   <button className="bg-black/60 hover:bg-black/80 border border-white/30 rounded size-8 flex items-center justify-center text-white text-xs transition-colors">
//                     <CiMaximize1 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="mb-8">
//               <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
//                 Ticket Information
//               </h2>
//               <p className="flex items-center mb-2.5 text-base text-gray-400">
//                 <CiBookmark className="mr-3 text-pink-500 text-xl flex-shrink-0" />{" "}
//                 {eventData.ticketPriceETH} ETH
//               </p>
//               <button
//                 onClick={openModal}
//                 className="mt-4 w-full md:w-auto bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2.5 rounded-md font-semibold hover:brightness-110 transition duration-200"
//               >
//                 Buy Tickets
//               </button>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
//                 Hosted by
//               </h2>
//               <div className="flex items-center gap-4">
//                 <div className="size-14 md:size-16 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
//                   {hostData.imageUrl ? (
//                     <img
//                       src={hostData.imageUrl}
//                       alt={hostData.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <CiUser className="text-3xl text-gray-400" />
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <p className="font-semibold text-lg text-white">
//                     {hostData.name}
//                   </p>
//                   <button className="w-auto bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-1.5 rounded-md font-semibold text-sm hover:brightness-110 transition duration-200 self-start">
//                     Contact
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
//             Event Description
//           </h2>
//           <p className="text-base text-gray-400 leading-relaxed">
//             {eventData.description}
//           </p>
//         </div>

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//             <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-white">
//               <h3 className="text-xl font-semibold mb-4">Purchase Tickets</h3>
//               <div className="mb-4">
//                 <label
//                   htmlFor="ticketQuantity"
//                   className="block text-sm font-medium mb-2"
//                 >
//                   Number of Tickets
//                 </label>
//                 <input
//                   type="number"
//                   id="ticketQuantity"
//                   value={ticketQuantity}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setTicketQuantity(value ? Math.max(1, parseInt(value)) : 1);
//                   }}
//                   min="1"
//                   className="w-full bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleBuyTickets}
//                   className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 rounded-md hover:brightness-110 transition-colors"
//                 >
//                   Buy Tickets
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {isAlertOpen && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-white shadow-lg">
//               <p className="text-lg font-semibold text-center mb-4">
//                 Success! Purchased {purchasedTickets.length} ticket(s)!
//               </p>
//               <div className="mb-4">
//                 {purchasedTickets.map((ticket) => (
//                   <div key={ticket.ticketId} className="mb-4 text-center">
//                     <p>Ticket ID: {ticket.ticketId}</p>
//                     <QRCodeSVG
//                       value={ticket.qrCodeUrl}
//                       size={128}
//                       className="mx-auto my-2"
//                       id={`qr-code-${ticket.ticketId}`}
//                     />
//                     <p className="text-sm text-gray-400">
//                       Scan this QR code to verify the ticket or check "My Tickets".
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={closeAlert}
//                   className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 rounded-md hover:brightness-110 transition-colors"
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventDetailsPageTailwind;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CiImageOn,
  CiCalendar,
  CiClock2,
  CiLocationOn,
  CiUser,
  CiBookmark,
  CiFolderOn,
  CiFilter,
  CiMaximize1,
  CiZoomIn,
  CiZoomOut,
} from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { ethers } from "ethers";
import { QRCodeSVG } from "qrcode.react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configuration
const CONTRACT_ADDRESS = "0xca4e3ab811d782365271f6df6da0f087159d2ac5"; // Sepolia contract address
const EXPECTED_CHAIN_ID = "11155111"; // Sepolia
const ADMIN_WALLET_ADDRESS = "0x22d3400d3c38864e3d3ff687390f71150Fcc002a"; // Admin wallet for fallback
const API_BASE_URL = "http://localhost:5000";
const QR_CODE_BASE_URL = "http://localhost:3000/ticket/verify";

const TicketContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ticketType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "nftMetadataUri",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "qrCodeMetadata",
        type: "string",
      },
    ],
    name: "TicketPurchased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isValid",
        type: "bool",
      },
    ],
    name: "TicketVerified",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_ticketType",
        type: "string",
      },
      {
        internalType: "string",
        name: "_nftMetadataUri",
        type: "string",
      },
    ],
    name: "buyTicket",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_ticketType",
        type: "string",
      },
    ],
    name: "getTicketPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ticketId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_transactionHash",
        type: "string",
      },
    ],
    name: "setTransactionHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ticketCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tickets",
    outputs: [
      {
        internalType: "uint256",
        name: "ticketId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "ticketType",
        type: "string",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "nftMetadataUri",
        type: "string",
      },
      {
        internalType: "string",
        name: "transactionHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isVerified",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "purchasedAt",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "qrCodeMetadata",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ticketId",
        type: "uint256",
      },
    ],
    name: "verifyTicket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const EventDetailsPageTailwind = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [hostData, setHostData] = useState({ name: "", imageUrl: null });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Fetch ticket price from smart contract
  const fetchTicketPriceFromContract = async (ticketType) => {
    if (!window.ethereum) {
      console.warn("MetaMask not available for contract price fetch");
      return null;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TicketContractABI,
        provider
      );
      const priceWei = await contract.getTicketPrice(ticketType);
      const priceEth = ethers.formatEther(priceWei);
      const parsedPrice = Number(parseFloat(priceEth).toFixed(4));
      console.log(`Fetched ticket price from contract for ${ticketType}: ${parsedPrice} ETH`);
      return parsedPrice;
    } catch (err) {
      console.error("Error fetching ticket price from contract:", err.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        console.log("Fetching event with ID:", eventId);
        const response = await fetch(
          `${API_BASE_URL}/api/detailsEvents/${eventId}`
        );
        if (!response.ok)
          throw new Error(`Failed to fetch event data: ${response.statusText}`);
        const data = await response.json();
        console.log("API response:", data);

        const event = data.event || data;

        // Handle ticketPriceETH
        let ticketPriceETH = event.ticketPriceETH;
        if (typeof ticketPriceETH === "string") {
          ticketPriceETH = parseFloat(ticketPriceETH);
        }
        if (
          !ticketPriceETH ||
          isNaN(ticketPriceETH) ||
          ticketPriceETH <= 0 ||
          ticketPriceETH > 10
        ) {
          console.warn(
            "Invalid ticketPriceETH from API, attempting to fetch from contract:",
            ticketPriceETH
          );
          // Set default ticket type if missing
          if (!event.ticketType) {
            console.warn("Missing ticketType, setting default");
            event.ticketType = "General Admission";
          }
          // Try fetching from contract
          const contractPrice = await fetchTicketPriceFromContract(event.ticketType);
          if (contractPrice && contractPrice > 0) {
            ticketPriceETH = contractPrice;
          } else {
            // Fallback to default based on ticketType
            ticketPriceETH = event.ticketType === "General Admission" ? 0.05 : 0.1;
            console.warn(
              `Using default ticket price: ${ticketPriceETH} ETH for ticketType: ${event.ticketType}`
            );
          }
        }
        event.ticketPriceETH = Number(ticketPriceETH.toFixed(4));

        // Ensure ticketType is set
        if (!event.ticketType) {
          console.warn("Setting default ticketType");
          event.ticketType = "General Admission";
        }

        setEventData(event);

        // Fetch host data
        try {
          const hostResponse = await fetch(
            `${API_BASE_URL}/api/hosts/${event.hostId}`
          );
          if (!hostResponse.ok) throw new Error("Failed to fetch host data");
          const hostData = await hostResponse.json();
          setHostData({
            name: hostData.user?.name || "Unknown Host",
            imageUrl: hostData.user?.imageUrl || null,
          });
        } catch (hostErr) {
          console.error("Host fetch error:", hostErr.message);
          setHostData({ name: "Unknown Host", imageUrl: null });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const nextImage = () => {
    if (eventData?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === eventData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (eventData?.images?.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? eventData.images.length - 1 : prevIndex - 1
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeAlert = () => {
    setIsAlertOpen(false);
    setTicketQuantity(1);
    setPurchasedTickets([]);
  };

  const saveTicketToMongoDB = async (ticketData) => {
    const qrCodeUrl = `${QR_CODE_BASE_URL}/${ticketData.ticketId}`;
    // Convert eventData.startDate to Unix timestamp (milliseconds)
    let eventDateTimestamp;
    try {
      const startDate = new Date(eventData.startDate);
      eventDateTimestamp = startDate.getTime();
      if (isNaN(eventDateTimestamp)) {
        throw new Error("Invalid event date format");
      }
    } catch (err) {
      console.error("Error parsing eventDate:", err.message);
      eventDateTimestamp = Date.now();
    }

    const ticketDataWithQr = {
      ...ticketData,
      qrCodeMetadata: qrCodeUrl,
      isUsed: false,
      eventDate: eventDateTimestamp,
    };

    const maxRetries = 3;
    const delay = 1000;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `Saving ticket metadata (Attempt ${attempt}):`,
          ticketDataWithQr
        );
        const response = await fetch(`${API_BASE_URL}/api/ticketMetadata`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticketDataWithQr),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to save ticket metadata: ${errorText || response.statusText}`
          );
        }

        const result = await response.json();
        console.log("Ticket metadata saved:", result);
        return { ...result, qrCodeUrl };
      } catch (err) {
        console.error(`Attempt ${attempt} failed:`, err.message);
        if (attempt === maxRetries) {
          toast.warn(
            "Failed to save ticket to the database. You can still use the QR code, but contact support if issues persist.",
            { position: "top-right", autoClose: 10000 }
          );
          return { ...ticketDataWithQr, qrCodeUrl };
        }
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      }
    }
  };

  const handleBuyTickets = async () => {
    if (!eventData) {
      toast.error("Event data not available. Please try again later.", {
        position: "top-right",
      });
      return;
    }

    if (!ticketQuantity || ticketQuantity <= 0) {
      toast.error("Please select at least one ticket.", {
        position: "top-right",
      });
      return;
    }

    setIsPurchasing(true);
    const ticketPrice = eventData.ticketPriceETH;
    const newPurchasedTickets = [];

    try {
      for (let i = 0; i < ticketQuantity; i++) {
        toast.info(`Purchasing ticket ${i + 1} of ${ticketQuantity}...`, {
          position: "bottom-center",
          autoClose: 5000,
        });
        const result = await purchaseTicketsOnBlockchain(ticketPrice);
        if (result && result.tx && result.ticketId) {
          const ticketData = {
            ticketId: result.ticketId,
            eventId: eventData._id,
            ticketType: eventData.ticketType,
            owner: result.tx.from,
            nftMetadataUri: result.nftMetadataUri,
            transactionHash: result.tx.hash,
            price: ticketPrice,
            purchasedAt: Math.floor(Date.now() / 1000),
          };
          const savedTicket = await saveTicketToMongoDB(ticketData);
          newPurchasedTickets.push({
            ticketId: result.ticketId,
            qrCodeUrl: savedTicket.qrCodeUrl,
          });
        } else {
          console.warn(`Transaction ${i + 1} failed.`);
          toast.error(
            `Failed to purchase ticket ${i + 1}. Stopping purchase.`,
            {
              position: "top-right",
            }
          );
          break;
        }
      }

      if (newPurchasedTickets.length > 0) {
        setPurchasedTickets(newPurchasedTickets);
        setIsAlertOpen(true);
        closeModal();
        toast.success(
          `Successfully purchased ${newPurchasedTickets.length} ticket(s)!`,
          {
            position: "top-right",
          }
        );
      } else {
        toast.error(
          "No tickets were purchased. Please check your wallet balance and try again.",
          {
            position: "top-right",
          }
        );
      }
    } catch (err) {
      console.error("Purchase error:", err);
      toast.error(`Purchase failed: ${err.message}`, {
        position: "top-right",
        autoClose: 7000,
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const purchaseTicketsOnBlockchain = async (ticketPrice) => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask to continue.", {
        position: "top-right",
      });
      throw new Error("MetaMask not installed");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = network.chainId.toString();

      // Ensure correct network
      if (chainId !== EXPECTED_CHAIN_ID) {
        try {
          await provider.send("wallet_switchEthereumChain", [
            { chainId: `0x${parseInt(EXPECTED_CHAIN_ID).toString(16)}` },
          ]);
        } catch (switchError) {
          if (switchError.code === 4902) {
            await provider.send("wallet_addEthereumChain", [
              {
                chainId: `0x${parseInt(EXPECTED_CHAIN_ID).toString(16)}`,
                chainName: "Sepolia Test Network",
                rpcUrls: ["https://rpc.sepolia.org"],
                nativeCurrency: {
                  name: "Sepolia ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ]);
          } else {
            throw new Error(
              `Please switch to Sepolia (Chain ID: ${EXPECTED_CHAIN_ID}).`
            );
          }
        }
      }

      // Validate ticket price
      let normalizedPrice = ticketPrice;
      if (typeof ticketPrice === "string") {
        normalizedPrice = parseFloat(ticketPrice);
      }
      if (
        isNaN(normalizedPrice) ||
        normalizedPrice <= 0 ||
        normalizedPrice > 10
      ) {
        throw new Error(
          `Invalid ticket price: ${normalizedPrice} ETH. Must be between 0.01 and 10 ETH.`
        );
      }
      normalizedPrice = Number(normalizedPrice.toFixed(4));

      const ticketPriceWei = ethers.parseEther(normalizedPrice.toString());
      const gasEstimateWei = ethers.parseEther("0.01");
      const totalRequiredWei = ticketPriceWei + gasEstimateWei;

      const balance = await provider.getBalance(walletAddress);
      if (balance < totalRequiredWei) {
        throw new Error(
          `Insufficient funds. Need ${ethers.formatEther(
            totalRequiredWei
          )} ETH (including gas). Current balance: ${ethers.formatEther(balance)} ETH.`
        );
      }

      const nftMetadataUri =
        "ipfs://bafkreibpdgwh5beu3iwdm3ml6ox4y35dozmexrdo34vl4rwy6s36ydfthq";

      // Parse eventId safely
      const eventIdHex = eventData._id.slice(-8);
      const parsedEventId = parseInt(eventIdHex, 16);
      if (isNaN(parsedEventId) || parsedEventId <= 0) {
        throw new Error("Invalid event ID. Please contact support.");
      }

      if (!eventData.ticketType) {
        throw new Error("Ticket type unavailable. Please contact support.");
      }

      let result;
      try {
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          TicketContractABI,
          signer
        );

        const gasLimit = await contract.estimateGas
          .buyTicket(parsedEventId, eventData.ticketType, nftMetadataUri, {
            value: ticketPriceWei,
          })
          .catch(() => 300000);

        toast.info(
          "Please confirm the transaction in your wallet to purchase the ticket.",
          {
            autoClose: 10000,
            position: "bottom-center",
          }
        );

        const tx = await contract.buyTicket(
          parsedEventId,
          eventData.ticketType,
          nftMetadataUri,
          {
            value: ticketPriceWei,
            gasLimit,
          }
        );

        toast.info(
          `Transaction sent (${tx.hash.substring(0, 8)}...). Waiting for confirmation...`,
          { autoClose: 15000, position: "bottom-center" }
        );

        const receipt = await tx.wait();
        if (receipt.status !== 1) {
          throw new Error("Transaction failed on-chain.");
        }

        const ticketIdEvent = receipt.logs
          .filter(
            (log) => log.address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()
          )
          .map((log) => {
            try {
              return contract.interface.parseLog(log);
            } catch {
              return null;
            }
          })
          .find((event) => event && event.name === "TicketPurchased");

        if (!ticketIdEvent) {
          throw new Error("TicketPurchased event not found.");
        }

        const ticketId = ticketIdEvent.args.ticketId.toNumber();
        result = { tx, ticketId, nftMetadataUri };
      } catch (contractError) {
        console.error("Contract purchase failed:", contractError);
        toast.warn("Smart contract purchase failed. Attempting fallback payment...", {
          position: "top-right",
          autoClose: 7000,
        });

        const tx = await signer.sendTransaction({
          to: ADMIN_WALLET_ADDRESS,
          value: ticketPriceWei,
          gasLimit: 21000,
        });

        toast.info(
          `Fallback transaction sent (${tx.hash.substring(0, 8)}...). Waiting for confirmation...`,
          { autoClose: 15000, position: "bottom-center" }
        );

        const receipt = await tx.wait();
        if (receipt.status !== 1) {
          throw new Error("Fallback transaction failed on-chain.");
        }

        const pseudoTicketId =
          Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
        result = { tx, ticketId: pseudoTicketId, nftMetadataUri };
      }

      console.log("Transaction successful:", result.tx.hash, "Ticket ID:", result.ticketId);
      return result;
    } catch (err) {
      let errorMessage = err.message || "Unknown error";
      if (err.code === "ACTION_REJECTED") {
        errorMessage = "Transaction rejected by user in wallet.";
      } else if (err.reason) {
        errorMessage = `Transaction failed: ${err.reason}`;
      }
      throw new Error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <p className="text-pink-400 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-xl">Event not found.</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 px-5 py-10 flex justify-center items-start font-sans">
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 max-w-4xl w-full text-gray-300">
          <div className="relative bg-gray-800 h-[200px] md:h-[300px] rounded-lg mb-8 overflow-hidden">
            {eventData.images?.length > 0 ? (
              <>
                <img
                  src={eventData.images[currentImageIndex].url}
                  alt={`${eventData.eventTitle} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 border border-white/30 rounded-full size-10 flex items-center justify-center text-white transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 border border-white/30 rounded-full size-10 flex items-center justify-center text-white transition-colors"
                >
                  →
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {eventData.images.map((_, index) => (
                    <div
                      key={index}
                      className={`size-3 rounded-full ${
                        currentImageIndex === index ? "bg-white" : "bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <CiImageOn className="text-6xl text-gray-500" />
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
            {eventData.eventTitle}
          </h1>

          <div className="mb-8 bg-gray-900/50 border border-white/20 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-gray-900/70 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <CiFolderOn className="text-pink-500 text-xl flex-shrink-0" />
              <p className="text-base">
                <span className="font-semibold bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
                  Category:
                </span>{" "}
                <span className="text-gray-300">{eventData.category}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CiFilter className="text-pink-500 text-xl flex-shrink-0" />
              <p className="text-base">
                <span className="font-semibold bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
                  Type:
                </span>{" "}
                <span className="text-gray-300">{eventData.eventType}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-10 mb-8">
            <div className="flex-1 md:flex-[2] min-w-0">
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
                  Date and Time
                </h2>
                <p className="flex items-center mb-2.5 text-base text-gray-400">
                  <CiCalendar className="mr-3 text-pink-500 text-xl flex-shrink-0" />{" "}
                  {new Date(eventData.startDate).toLocaleDateString()}
                </p>
                <p className="flex items-center mb-2.5 text-base text-gray-400">
                  <CiClock2 className="mr-3 text-pink-500 text-xl flex-shrink-0" />{" "}
                  {eventData.startTime} - {eventData.endTime}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
                  Location
                </h2>
                <p className="flex items-start mb-2.5 text-base text-gray-400">
                  <CiLocationOn className="mr-3 text-pink-500 text-xl mt-1 flex-shrink-0" />
                  <span>
                    {eventData.eventType === "virtual"
                      ? "Virtual Event"
                      : eventData.location}
                  </span>
                </p>
                <div className="bg-gray-900 h-[200px] rounded-md mt-4 relative flex items-center justify-center overflow-hidden">
                  <IoLocationSharp className="text-pink-500 text-5xl" />
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                    <button className="bg-black/60 hover:bg-black/80 border border-white/30 rounded size-8 flex items-center justify-center text-white text-xs transition-colors">
                      <CiZoomIn size={18} />
                    </button>
                    <button className="bg-black/60 hover:bg-black/80 border border-white/30 rounded size-8 flex items-center justify-center text-white text-xs transition-colors">
                      <CiZoomOut size={18} />
                    </button>
                    <button className="bg-black/60 hover:bg-black/80 border border-white/30 rounded size-8 flex items-center justify-center text-white text-xs transition-colors">
                      <CiMaximize1 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
                  Ticket Information
                </h2>
                <p className="flex items-center mb-2.5 text-base text-gray-400">
                  <CiBookmark className="mr-3 text-pink-500 text-xl flex-shrink-0" />{" "}
                  {eventData.ticketPriceETH} ETH
                </p>
                <button
                  onClick={openModal}
                  className="mt-4 w-full md:w-auto bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2.5 rounded-md font-semibold hover:brightness-110 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPurchasing}
                >
                  Buy Tickets
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
                  Hosted by
                </h2>
                <div className="flex items-center gap-4">
                  <div className="size-14 md:size-16 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                    {hostData.imageUrl ? (
                      <img
                        src={hostData.imageUrl}
                        alt={hostData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CiUser className="text-3xl text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-lg text-white">
                      {hostData.name}
                    </p>
                    <button className="w-auto bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-1.5 rounded-md font-semibold text-sm hover:brightness-110 transition duration-200 self-start">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 pb-2 border-b border-white/20">
              Event Description
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              {eventData.description}
            </p>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-white">
                <h3 className="text-xl font-semibold mb-4">Purchase Tickets</h3>
                <div className="mb-4">
                  <label
                    htmlFor="ticketQuantity"
                    className="block text-sm font-medium mb-2"
                  >
                    Number of Tickets
                  </label>
                  <input
                    type="number"
                    id="ticketQuantity"
                    value={ticketQuantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTicketQuantity(
                        value ? Math.max(1, parseInt(value)) : ""
                      );
                    }}
                    min="1"
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    disabled={isPurchasing}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPurchasing}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBuyTickets}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 rounded-md hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPurchasing}
                  >
                    {isPurchasing ? "Purchasing..." : "Buy Tickets"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {isAlertOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-white shadow-lg">
                <p className="text-lg font-semibold text-center mb-4">
                  Success! Purchased {purchasedTickets.length} ticket(s)!
                </p>
                <div className="mb-4">
                  {purchasedTickets.map((ticket) => (
                    <div key={ticket.ticketId} className="mb-4 text-center">
                      <p>Ticket ID: {ticket.ticketId}</p>
                      <QRCodeSVG
                        value={ticket.qrCodeUrl}
                        size={128}
                        className="mx-auto my-2"
                        id={`qr-code-${ticket.ticketId}`}
                      />
                      <p className="text-sm text-gray-400">
                        Scan this QR code to verify the ticket or check "My Tickets".
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={closeAlert}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 rounded-md hover:brightness-110 transition-colors"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetailsPageTailwind;
