pragma solidity ^0.4.24;
import 'zeppelin/contracts/math/SafeMath.sol';
import 'zeppelin/contracts/lifecycle/Pausable.sol';

/** @title Voting contract. */
contract Voting is Pausable{
    using SafeMath for uint;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    event votedEvent (
        uint indexed _candidateId
    );

    /** @dev Function constructor. Iniciate the candidate's list.
      */
    constructor () public {
        addCandidate("Pedro Sánchez");
        addCandidate("Mariano Rajoy");
    }

    /** @dev Add candidates to the list of candidates.
      * @param _name Name of the candidate.
      */
    function addCandidate (string _name) private {
        candidatesCount = candidatesCount.add(1);
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    /** @dev Register a vote for one candidate.
      * @param _candidateId Id of the candidate.
      */
    function vote (uint _candidateId) whenNotPaused public {

        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount = candidates[_candidateId].voteCount .add(1);

        emit votedEvent(_candidateId);
    }
}