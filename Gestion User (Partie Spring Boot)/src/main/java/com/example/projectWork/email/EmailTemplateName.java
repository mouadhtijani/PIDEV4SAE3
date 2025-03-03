package com.example.projectWork.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    ACTIVATION_ACCOUNT("activate_account"),
    CODE_COMPANY("code_company"),
    APPLICATION_ACCEPTED("application_accepted"),
    APPLICATION_REFUSED("application_refused");
    private final String name;
    EmailTemplateName (String name){
        this.name= name;
    }
}
