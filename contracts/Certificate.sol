// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "hardhat/console.sol";

contract CertificateContract {
    struct Certificate {
        string userId;
        string courseId;
        string completedPoint;
        uint256 timestamp;
        bool isCompleted;
    }
    uint256 taxPrice = 0.0025 ether;
    mapping(string => mapping(string => Certificate)) certificates;

    event CertificateAdded(
        string userId,
        string courseId,
        string completedPoint,
        uint256 timestamp,
        bool isCompleted
    );

    function createCertificate(
        string memory _userId,
        string memory _courseId
    ) public payable {
        require(msg.value == taxPrice, "Price must be equal to listing price");
        Certificate memory newCertificate = Certificate({
            userId: _userId,
            courseId: _courseId,
            completedPoint: '0',
            timestamp: 0,
            isCompleted: false
        });
        certificates[_userId][_courseId] = newCertificate;
        emit CertificateAdded(
            _userId,
            _courseId,
            '0',
            0,
            false
        );
    }

    function addCertificate(
        string memory _userId,
        string memory _courseId,
        string memory _completedPoint
    ) external {
        uint256 _timestamp = block.timestamp;
        Certificate memory updateCertificate = Certificate({
            userId: _userId,
            courseId: _courseId,
            completedPoint: _completedPoint,
            timestamp: _timestamp,
            isCompleted: true
        });
        certificates[_userId][_courseId] = updateCertificate;
        emit CertificateAdded(
            _userId,
            _courseId,
            _completedPoint,
            _timestamp,
            true
        );
    }

    function getCertificate(
        string memory _userId,
        string memory _courseId
    ) external view returns (Certificate memory item) {
        return certificates[_userId][_courseId];
    }
}
