const leadService = require("../services/lead.service");

exports.createLead = async(req, res) => {
    try {
         const lead = await leadService.createLead({
            ...req.body,
            assignedTo: req.user.id 
        });
        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}    

exports.searchLeadscont = async (req, res) => {
    try {
      
        const results = await leadService.searchLeads(req.query);
        res.json({ success: true, ...results});
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getLeads = async(req, res) => {
    try {
        const result = await leadService.getLeads(req.query);
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getLead = async(req, res) => {
    try {
        const lead = await leadService.getLeadById(req.params.id);
        if(!lead) {
            return res.status(404).json({ 
                success: false, 
                message: "Lead not found" 
            });
        }
        res.json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.updatedLead = async(req, res) => {
    try {
        const lead = await leadService.updateLead(req.params.id, req.body, req.user.id);
        res.json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message }); 
    }
}

exports.deleteLead = async(req, res) => {
    try {
        const lead = await leadService.deleteLead(req.params.id, req.user.id);
        if(!lead) {
            return res.status(404).json({ 
                success: false, 
                message: "Lead not found" 
            });
        }
        res.json({ 
            success: true, 
            message: "Lead soft deleted successfully" 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.restoreLead = async(req, res) => {
    try {
        const lead = await leadService.restoreLead(req.params.id);
        if(!lead) {
            return res.status(404).json({ 
                success: false, 
                message: "Lead not found" 
            });
        }
        res.json({ 
            success: true, 
            message: "Lead restored successfully",
            data: lead 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.addFollowUp = async(req, res) => {
    try {
        const lead = await leadService.addFollowUp(req.params.id, req.body);
        res.json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message }); 
    }
}