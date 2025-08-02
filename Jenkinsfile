pipeline {
    agent any

    stages {
        stage('SCM Checkout') {
            steps {
                retry(3){
                    git branch: 'main', url: 'https://github.com/KanishkaTharuka/mern_project_docker_jenkins.git'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                bat 'docker build -t kanishkatharuka/client_test:%BUILD_NUMBER% ./client'
                bat 'docker build -t kanishkatharuka/server_test:%BUILD_NUMBER% ./server'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'test-dockerhubpassword', variable: 'test-dockerhubpass')]) {
                    bat 'docker login -u kanishkatharuka -p %test-dockerhubpass%'
                }
            }
        }
        stage('Push Docker Image'){
            steps{
                bat 'docker push kanishkatharuka/client_test:%BUILD_NUMBER%'
                bat 'docker push kanishkatharuka/server_test:%BUILD_NUMBER%'
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
