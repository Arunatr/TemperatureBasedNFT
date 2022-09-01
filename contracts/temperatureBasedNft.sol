pragma solidity ^0.6.0;
import "./provableAPI_0.6.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract temperatureBasedNft is ERC721, usingProvable {

    uint256 public temperature; // To store the temperature of City
    address public owner;   // To store owner of the Contract

    constructor(string memory _name,string memory _symbol) public
    ERC721(_name,_symbol){
    owner = msg.sender;
    updateTemperature();         // First check at contract creation.
    }
     
    //  
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
    _;
    }

    modifier onlyProvable() {
    require(msg.sender == provable_cbAddress(), "The sender is not Provable's server.");
    _;
    }
     
    // To mint the NFT721 token if Temperature of Mumbai is above 15C(ie1500)
    // else it reverts

    function mintNft(address _to,uint256 _id,string memory _uri) external onlyOwner
    {
       //updateTemperature();
       require(temperature >= 1500, "Temperature price is low - You are unable to mint");
       require(_to != address(0), "Not valid address");
       _safeMint(_to,_id);
       _setTokenURI(_id,_uri);

    }
     

   event LogUpdated(string temp);
   event LogNewProvableQuery(string description);
  
    // It recevies the result from provable server.
   function __callback(bytes32 myid, string memory result) virtual override public onlyProvable {
      temperature = parseInt(result,2);       // converting the string into uint with two decimal adjusment
      //updateTemperature();  // if we want to update periodically, we can enable this line for recursive update 
      emit LogUpdated(result);
   }


   // ProvableQuery reterives the Temberature of the Mumbai using WolframAlpha Knowledge engine.
   // It uses data source type as WolframAlpha
   function updateTemperature() payable public {
       if (provable_getPrice("WolframAlpha") > address(this).balance) {
           emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           emit LogNewProvableQuery("Provable query was sent, standing by for the answer..");
           provable_query("WolframAlpha", "temperature in Mumbai");
       }
   }
}