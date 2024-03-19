package com.cetin.hospital.response;

import com.cetin.hospital.model.Doctor;
import lombok.Data;

import java.util.List;

@Data
public class DoctorResponse {
    private Long id;
    private String TC;
    private String name;
    private String password;
    private List<TimeResponse> clocks;

    public DoctorResponse(Doctor doctor) {
        this.id = doctor.getId();
        this.TC = doctor.getTC();
        this.name = doctor.getName();
        this.password = doctor.getPassword();
        this.clocks = doctor.getClocks().stream().map(TimeResponse::new).toList();
    }
}