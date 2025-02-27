declare namespace BranchTyping {
  interface BranchInfo {
    id: string;
    branchName: string;
    address: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  interface BranchDTO {
    branchName: string;
    address: string;
    description: string;
  }
}