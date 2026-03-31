const Lead = require("../models/lead.model");

exports.createLead = async(data) => {
    const existing = await Lead.findOne({ 
        phone: data.phone, 
        isDeleted: false 
    });
    if(existing) throw new Error("Lead with this phone already exists");

    const lead = new Lead(data);
    return await lead.save();
}

exports.getLeads = async(query) => {
    const {
        status, source, assignedTo,
        page = 1, limit = 20,
        sortBy = "createdAt", order = "desc"
    } = query;

    const filter = { isDeleted: false };

    if(status) filter.status = status;
    if(source) filter.source = source;
    if(assignedTo) filter.assignedTo = assignedTo;

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [leads, total] = await Promise.all([
        Lead.find(filter)
            // .populate("assignedTo", "name email")
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit)),
        Lead.countDocuments(filter)
    ]);

    return {
        leads,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
}

exports.getLeadById = async(id) => {
    return await Lead.findOne({ 
        _id: id, 
        isDeleted: false  
    })
    // .populate("assignedTo", "name email");
}

exports.updateLead = async(id, data) => {
    const lead = await Lead.findOne({ _id: id, isDeleted: false });
    if(!lead) throw new Error("Lead not found");

    delete data.isDeleted;
    delete data.deletedAt;

    return await Lead.findByIdAndUpdate(
        id, 
        data, 
        { new: true, runValidators: true }
    )
    // .populate("assignedTo", "name email");
}

exports.deleteLead = async(id) => {
    const lead = await Lead.findById(id);
    if(!lead) return null;
    if(lead.isDeleted) throw new Error("Lead is already deleted");

    return await Lead.findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
    );
}

exports.restoreLead = async(id) => {
    const lead = await Lead.findById(id);
    if(!lead) return null;
    if(!lead.isDeleted) throw new Error("Lead is not deleted");

    return await Lead.findByIdAndUpdate(
        id,
        { isDeleted: false, deletedAt: null },
        { new: true }
    );
}

exports.addFollowUp = async(id, data) => {
    const lead = await Lead.findOne({ _id: id, isDeleted: false });
    if(!lead) throw new Error("Lead not found");

    lead.followUps.push(data);
    return await lead.save();
}