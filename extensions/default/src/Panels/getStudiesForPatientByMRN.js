async function getStudiesForPatientByMRN(dataSource, qidoForStudyUID) {
  // if (qidoForStudyUID && qidoForStudyUID.length && qidoForStudyUID[0].mrn) {
  if (qidoForStudyUID && qidoForStudyUID.length && qidoForStudyUID[0].accession) {
    return dataSource.query.studies.search({
      // patientId: qidoForStudyUID[0].mrn,
      accessionNumber: qidoForStudyUID[0].accession,
    });
  }
  console.log('No mrn found for', qidoForStudyUID);
  return qidoForStudyUID;
}

export default getStudiesForPatientByMRN;
