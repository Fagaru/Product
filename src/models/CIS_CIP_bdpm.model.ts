import mongoose from 'mongoose'

const CIS_CIP_bdpm = mongoose.model( 
    "CIS_CIP_bdpm",
    new mongoose.Schema({
        codeCIS: {
            type: String,
            required: true
        },
        codeCIP7: {
            type: String,
            required: true
        },
        presentationLabel: {
            type: String,
            required: false
        },
        administrativeStatusOfPresentation: {
            type: String,
            required: false
        },
        marketingStatus: {
            type: String,
            required: false
        },
        marketingDeclarationDate: {
            type: String,
            required: false
        },
        codeCIP13: {
            type: String,
            required: false
        },
        approvalForCommunities: {
            type: String,
            required: false
        },
        reimbursementRate: {
            type: String,
            default: false
        },
        priceInEuros: {
            type: String,
            required: false
        },
        indicGivingEntitlementToRefund: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
        updateAt: {
            type: Date,
            required: false
        },
        deletedAt: {
            type: Date,
            required: false
        },
    })
)

export default CIS_CIP_bdpm;
