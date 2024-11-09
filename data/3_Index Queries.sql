-- All queries relating to expiations looking up offences in the Offence table:
CREATE NONCLUSTERED INDEX Expiations_Offence_INDX ON Expiations(offenceCode ASC)



-- If running queries determining Driver or Vehicle Registration State
CREATE NONCLUSTERED INDEX ExpiationsDriver_CountryState_INDX
ON Expiations(driverState ASC);

CREATE NONCLUSTERED INDEX ExpiationsRego_CountryState_INDX
ON Expiations(regState ASC);


--  IF running queries determining regional/local service area location of expiation
CREATE NONCLUSTERED INDEX Expiation_LSA_INDX ON Expiations(lsaCode ASC)


-- If running queries based on Fixed/Mobile Speed Cameras:
CREATE NONCLUSTERED INDEX Expiation_CameraLocation_INDX ON Expiations(cameraLocationID ASC, cameraTypeCode ASC)

CREATE NONCLUSTERED INDEX Expiation_CameraTypeCode_INDX ON Expiations(cameraTypeCode ASC, cameraLocationID ASC)

-- If running queries based on Mobile/Fixed speed cameras where expiations were rejected/erroneous
CREATE NONCLUSTERED INDEX Expiations_Rejctions_INDX ON Expiations(photoRejCode aSC)

-- If running queries based on 5 main Speeding categories (1-9km/h, 10-19km-h etc)
CREATE NONCLUSTERED INDEX ExpiationCategories_Offence_INDX ON SpeedingCategories(offenceCode ASC)

-- If running queries based on Expiations successful or failed.
CREATE NONCLUSTERED INDEX Expiations_Notice_INDX ON Expiations(statusCode ASC)

-- If running queries based on failed/unsuccessful expiations
CREATE NONCLUSTERED INDEX Expiations_Withdrawn_INDX ON Expiations(withdrawCode ASC)

-- If running queries based around Cuations vs Expiated vs Disqualification
CREATE NONCLUSTERED INDEX Expiations_ExpType_INDX ON Expiations(typeCode ASC)

