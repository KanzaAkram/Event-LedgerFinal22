// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { ethers } from "ethers";

// const TicketVerificationPage = () => {
//   const { ticketId } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
//   const CONTRACT_ADDRESS = "0xA58f8f070471A67B48Bb760Cf936B2C085bD591E";

//   const TicketContractABI = [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "buyer",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "ticketId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "ticketType",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "price",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "eventId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "nftMetadataUri",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "qrCodeMetadata",
//           "type": "string"
//         }
//       ],
//       "name": "TicketPurchased",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "ticketId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "bool",
//           "name": "isValid",
//           "type": "bool"
//         }
//       ],
//       "name": "TicketVerified",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_eventId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "_ticketType",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_nftMetadataUri",
//           "type": "string"
//         }
//       ],
//       "name": "buyTicket",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_ticketType",
//           "type": "string"
//         }
//       ],
//       "name": "getTicketPrice",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "pure",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_ticketId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "_transactionHash",
//           "type": "string"
//         }
//       ],
//       "name": "setTransactionHash",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_ticketId",
//           "type": "uint256"
//         }
//       ],
//       "name": "verifyTicket",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "withdraw",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "admin",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "ticketCounter",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "tickets",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "ticketId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "eventId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "ticketType",
//           "type": "string"
//         },
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "nftMetadataUri",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "transactionHash",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "price",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bool",
//           "name": "isVerified",
//           "type": "bool"
//         },
//         {
//           "internalType": "uint256",
//           "name": "purchasedAt",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "qrCodeMetadata",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/ticketMetadata/${ticketId}`);
//         if (!response.ok) throw new Error("Failed to fetch ticket");
//         const data = await response.json();
//         setTicket(data);

//         if (window.ethereum) {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, provider);
//           const onChainTicket = await contract.tickets(ticketId);
//           if (onChainTicket.isVerified !== data.isUsed) {
//             await fetch(`${API_BASE_URL}/api/ticketMetadata/${ticketId}`, {
//               method: "PATCH",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ isUsed: onChainTicket.isVerified }),
//             });
//             setTicket({ ...data, isUsed: onChainTicket.isVerified });
//           }
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTicket();
//   }, [ticketId]);

//   const markAsUsed = async () => {
//     try {
//       if (!window.ethereum) throw new Error("MetaMask not installed");
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, signer);
//       const tx = await contract.verifyTicket(ticketId);
//       await tx.wait();

//       const response = await fetch(`${API_BASE_URL}/api/ticketMetadata/${ticketId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isUsed: true, usedAt: new Date() }),
//       });
//       if (!response.ok) throw new Error("Failed to update ticket status");
//       const updatedTicket = await response.json();
//       setTicket(updatedTicket);
//       alert("Ticket marked as used!");
//     } catch (err) {
//       setError(`Failed to mark ticket as used: ${err.message}`);
//     }
//   };

//   if (loading) return <p className="text-white text-center">Loading...</p>;
//   if (error) return <p className="text-pink-400 text-center">Error: {error}</p>;
//   if (!ticket) return <p className="text-white text-center">Ticket not found.</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-6 text-white">
//       <h1 className="text-2xl font-bold mb-4 text-center">Ticket Verification</h1>
//       <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
//         <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
//         <p><strong>Event ID:</strong> {ticket.eventId}</p>
//         <p><strong>Status:</strong> {ticket.isUsed ? "Used" : "Valid"}</p>
//         <p><strong>Owner:</strong> {ticket.owner}</p>
//         <p><strong>Purchased At:</strong> {new Date(ticket.purchasedAt * 1000).toLocaleString()}</p>
//         {!ticket.isUsed && (
//           <button
//             onClick={markAsUsed}
//             className="mt-4 w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-md hover:brightness-110"
//           >
//             Mark as Used
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TicketVerificationPage;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

const TicketVerificationPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use ngrok URL from environment variable or fallback to a placeholder ngrok URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://1234-5678.ngrok-free.app"; // Replace with your actual ngrok URL
  const CONTRACT_ADDRESS = "0xA58f8f070471A67B48Bb760Cf936B2C085bD591E";

  const TicketContractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ticketType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "nftMetadataUri",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "qrCodeMetadata",
          "type": "string"
        }
      ],
      "name": "TicketPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isValid",
          "type": "bool"
        }
      ],
      "name": "TicketVerified",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_eventId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_ticketType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_nftMetadataUri",
          "type": "string"
        }
      ],
      "name": "buyTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ticketType",
          "type": "string"
        }
      ],
      "name": "getTicketPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_ticketId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_transactionHash",
          "type": "string"
        }
      ],
      "name": "setTransactionHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_ticketId",
          "type": "uint256"
        }
      ],
      "name": "verifyTicket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ticketCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tickets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "ticketType",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "nftMetadataUri",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "transactionHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isVerified",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "purchasedAt",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "qrCodeMetadata",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch($`{API_BASE_URL}/api/ticketMetadata/${ticketId}`);
        if (!response.ok) throw new Error("Failed to fetch ticket");
        const data = await response.json();
        setTicket(data);

        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, provider);
          const onChainTicket = await contract.tickets(ticketId);
          if (onChainTicket.isVerified !== data.isUsed) {
            await fetch(`${API_BASE_URL}/api/ticketMetadata/${ticketId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isUsed: onChainTicket.isVerified }),
            });
            setTicket({ ...data, isUsed: onChainTicket.isVerified });
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [ticketId]);

  const markAsUsed = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TicketContractABI, signer);
      const tx = await contract.verifyTicket(ticketId);
      await tx.wait();

      const response = await fetch(`${API_BASE_URL}/api/ticketMetadata/${ticketId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isUsed: true, usedAt: new Date() }),
      });
      if (!response.ok) throw new Error("Failed to update ticket status");
      const updatedTicket = await response.json();
      setTicket(updatedTicket);
      alert("Ticket marked as used!");
    } catch (err) {
      setError(`Failed to mark ticket as used: ${err.message}`);
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-pink-400 text-center">Error: {error}</p>;
  if (!ticket) return <p className="text-white text-center">Ticket not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Ticket Verification</h1>
      <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
        <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
        <p><strong>Event ID:</strong> {ticket.eventId}</p>
        <p><strong>Status:</strong> {ticket.isUsed ? "Used" : "Valid"}</p>
        <p><strong>Owner:</strong> {ticket.owner}</p>
        <p><strong>Purchased At:</strong> {new Date(ticket.purchasedAt * 1000).toLocaleString()}</p>
        {!ticket.isUsed && (
          <button
            onClick={markAsUsed}
            className="mt-4 w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-md hover:brightness-110"
          >
            Mark as Used
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketVerificationPage;