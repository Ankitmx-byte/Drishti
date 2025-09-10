class ClaimService {
  constructor() {
    // Mock service for development
  }

  async getClaims(filters = {}) {
    // Mock claims data
    const mockClaims = [
      {
        id: 1,
        claimId: 'FRA-2024-001',
        claimantName: 'Rajesh Kumar',
        village: 'Village A',
        state: 'MP',
        district: 'District A',
        status: 'pending',
        landArea: 2.5,
        claimType: 'individual',
        submissionDate: '2024-01-15',
        documents: ['doc1.pdf', 'doc2.jpg']
      },
      {
        id: 2,
        claimId: 'FRA-2024-002',
        claimantName: 'Priya Singh',
        village: 'Village B',
        state: 'OD',
        district: 'District B',
        status: 'approved',
        landArea: 1.8,
        claimType: 'community',
        submissionDate: '2024-01-10',
        documents: ['doc3.pdf']
      },
      {
        id: 3,
        claimId: 'FRA-2024-003',
        claimantName: 'Amit Patel',
        village: 'Village C',
        state: 'TL',
        district: 'District C',
        status: 'rejected',
        landArea: 3.2,
        claimType: 'individual',
        submissionDate: '2024-01-08',
        documents: ['doc4.pdf', 'doc5.jpg']
      }
    ];

    // Apply filters
    let filteredClaims = mockClaims;

    if (filters.status) {
      filteredClaims = filteredClaims.filter(claim => claim.status === filters.status);
    }

    if (filters.state) {
      filteredClaims = filteredClaims.filter(claim => claim.state === filters.state);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredClaims = filteredClaims.filter(claim =>
        claim.claimantName.toLowerCase().includes(searchTerm) ||
        claim.village.toLowerCase().includes(searchTerm) ||
        claim.claimId.toLowerCase().includes(searchTerm)
      );
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    return filteredClaims;
  }

  async getClaimById(id) {
    const claims = await this.getClaims();
    const claim = claims.find(c => c.id === parseInt(id));

    if (!claim) {
      throw new Error('Claim not found');
    }

    return claim;
  }

  async createClaim(claimData) {
    const newClaim = {
      id: Date.now(),
      claimId: `FRA-2024-${Date.now()}`,
      ...claimData,
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
      documents: claimData.files ? claimData.files.map(f => f.name) : []
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    return newClaim;
  }

  async updateClaim(updateData) {
    // Mock update - in real app, would use claim ID from updateData
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...updateData, updated: true };
  }

  async deleteClaim() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Claim deleted successfully' };
  }

  async getClaimStats() {
    const claims = await this.getClaims();

    const stats = {
      total: claims.length,
      pending: claims.filter(c => c.status === 'pending').length,
      approved: claims.filter(c => c.status === 'approved').length,
      rejected: claims.filter(c => c.status === 'rejected').length,
      totalArea: claims.reduce((sum, c) => sum + c.landArea, 0)
    };

    return stats;
  }

  async uploadDocument(file) {
    // Mock file upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: `mock-url/${file.name}`
    };
  }

  async getDocuments() {
    // Mock documents
    return [
      { id: 1, name: 'land_document.pdf', type: 'application/pdf', size: 2048576, uploadedAt: '2024-01-15' },
      { id: 2, name: 'identity_proof.jpg', type: 'image/jpeg', size: 1048576, uploadedAt: '2024-01-15' }
    ];
  }

  async downloadDocument() {
    // Mock download
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Download initiated' };
  }
}

export default new ClaimService();
