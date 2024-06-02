pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
    }
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKERHUB_TOKEN', usernameVariable: 'DOCKERHUB_USR')]) {
                        echo "Docker Username: ${DOCKERHUB_USR}"
                        echo "Attempting Docker Login"
                        bat """
                        echo %DOCKERHUB_TOKEN% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker build -t ${DOCKER_IMAGE}:latest .
                        docker push ${DOCKER_IMAGE}:latest
                        docker logout
                        """
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npm run test'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying...'
                }
            }
        }
        stage('Release') {
            steps {
                script {
                    echo 'Releasing...'
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    echo 'Monitoring and Alerting...'
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/*.json, cypress/reports/index.html', allowEmptyArchive: true
            junit 'cypress/reports/junit/*.xml' // Ensure this path matches the JUnit report output
        }
    }
}
