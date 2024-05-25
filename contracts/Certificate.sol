// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "hardhat/console.sol";

contract CertificateContract {
    struct Certificate {
        string userId;
        string courseId;
        string completedPoint;
        uint256 timestamp;
    }
    uint256 taxPrice = 0.0025 ether;
    mapping(string => mapping(string => Certificate)) certificates;

    event CertificateAdded(
        string userId,
        string courseId,
        string completedPoint,
        uint256 timestamp
    );
    function addCertificate(
        string memory _userId,
        string memory _courseId,
        string memory _completedPoint
    ) external {
        require(
            bytes(certificates[_userId][_courseId].userId).length == 0,
            "Certificate already exists"
        );
        uint256 _timestamp = block.timestamp;
        Certificate memory newCertificate = Certificate({
            userId: _userId,
            courseId: _courseId,
            completedPoint: _completedPoint,
            timestamp: _timestamp
        });
        certificates[_userId][_courseId] = newCertificate;
        emit CertificateAdded(_userId, _courseId, _completedPoint, _timestamp);
    }

    function getCertificate(
        string memory _userId,
        string memory _courseId
    ) external view returns (Certificate memory item) {
        return certificates[_userId][_courseId];
    }
}
