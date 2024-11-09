CREATE TABLE Expiations(
	expID int NOT NULL,
	incidentStartDate date NOT NULL,
	incidentStartTime time(7) NOT NULL,
	issueDate date NULL,
	offencePenaltyAmt int NULL,
	offenceLevyAmt int NULL,
	corporateFeeAmt int NULL,
	totalFeeAmt int NULL,
	enforceWarningNoticeFeeAmt int NULL,
	bacContentExp decimal(4, 3) NULL,
	vehicleSpeed int NULL,
	locationSpeedLimit int NULL,
	offenceCode varchar(5) NULL,
	driverState varchar(5) NULL,
	regState varchar(5) NULL,
	lsaCode varchar(10) NULL,
	cameraLocationID int NULL,
	cameraTypeCode varchar(10) NULL,
	photoRejCode int NULL,
	statusCode varchar(5) NULL,
	withdrawCode varchar(5) NULL,
	typeCode varchar(5) NULL,
 CONSTRAINT Expiations_PK PRIMARY KEY CLUSTERED 
(
	incidentStartDate DESC, incidentStartTime DESC, expID DESC
)
)


    ALTER TABLE Expiations
	ADD
	CONSTRAINT FK_Expiations_Offences FOREIGN KEY (offenceCode) REFERENCES Offences(offenceCode),
    CONSTRAINT FK_Expiations_DriverState FOREIGN KEY (driverState) REFERENCES CountryStates(countryStateCode),
    CONSTRAINT FK_Expiations_RegState FOREIGN KEY (regState) REFERENCES CountryStates(countryStateCode),
    CONSTRAINT FK_Expiations_LSA FOREIGN KEY (lsaCode) REFERENCES LocalServiceAreas(lsaCode),
    CONSTRAINT FK_Expiations_CameraLocation FOREIGN KEY (cameraLocationID, cameraTypeCode) REFERENCES CameraCodes(locationID, cameraTypeCode),
    CONSTRAINT FK_Expiations_PhotoRejections FOREIGN KEY (photoRejCode) REFERENCES PhotoRejections(rejectionCode),
    CONSTRAINT FK_Expiations_Status FOREIGN KEY (statusCode) REFERENCES NoticeStates(statusCode),
    CONSTRAINT FK_Expiations_WithdrawReasons FOREIGN KEY (withdrawCode) REFERENCES WithdrawnReasons(withdrawCode),
    CONSTRAINT FK_Expiations_NoticeType FOREIGN KEY (typeCode) REFERENCES NoticeTypes(typeCode)






