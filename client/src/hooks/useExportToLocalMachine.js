/** 
  * Custom Hook to export the created JSON Object to the user's local machine as a .json file.
  *   - Example of how to implement: 'const exportJSON = useExportToLocalMachine(proofName, convertFormToJSON());'
  */
const useExportToLocalMachine = (proofName, JSONForm) => {
  /** 
   * Exports the created JSON Object to the user's local machine as a .json file.
   * Runs when the User selects the "JSON" option in the download drop-down menu.
   * - Or will run when the User selects the "Download" option if the drop-down options menu has not yet been implemented.
   * File will be named after the proof name the user entered, if no name is detected, a default name is assigned.
   */
  const exportFormToLocalMachine = () => {
    let fileName = proofName;
    let forToExport = JSONForm; // Should return a JSON Object of the form
    // Create the intended file for download in the browser...
    let blob = new Blob([forToExport], { type: 'application/json' });
    let href = URL.createObjectURL(blob);
    // Creates HTML with the href to a file...
    let link = document.createElement('a');
    link.href = href;

    // Check if user has named their proof, if user has not, will use the default name
    if(fileName == ''){
      // Default Name...
      fileName = 'your-JSON-File';
      link.download = fileName + '.json';
      link.click();
    }
    else{
      // User's Name for their Proof...
      link.download = fileName + '.json';
      link.click();
    }
  };

  return exportFormToLocalMachine;
};

export { useExportToLocalMachine };